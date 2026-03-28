import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateLobbyInput } from './dto/create-lobby.input';

import { JoinLobbyInput } from './dto/join-lobby.input';

import { UpdateLeaderboardInput } from './dto/update-leaderboard.input';
import { SubmitAnswerInput } from './dto/submit-answer.input';

import { lobbyPubSub } from './lobby.pubsub';
import { generateLobbyCode } from './lobby-code.util';

type PrismaLobbyClient = any;

@Injectable()
export class LobbyService {
  constructor(private readonly prisma: PrismaService) {}

  async createLobby(createLobbyInput: CreateLobbyInput, userId: string) {
    await this.ensureUserExists(userId);

    await this.ensureFlashcardSetExists(createLobbyInput.flashCardSetId);

    // get all the lobbycodes in a set
    const existingLobbyCodes = new Set(
      (
        await this.prisma.lobby.findMany({
          select: { lobbyCode: true },
        })
      ).map((lobby) => lobby.lobbyCode),
    );

    const lobbyCode = await generateLobbyCode(existingLobbyCodes);

    const lobby = await this.prisma.$transaction(async (tx) => {
      const createdLobby = await tx.lobby.create({
        data: {
          lobbyCode,

          lobbyStatus: 'WAITING',

          creatorUserId: userId,

          flashCardSetId: createLobbyInput.flashCardSetId,

          participantIds: [userId],
        },
      });

      const leaderboard = await tx.leaderboard.create({
        data: {
          lobbyId: createdLobby.id,
        },
      });

      const user = await tx.user.findUnique({
        where: { id: userId },

        select: { lobbyIds: true },
      });

      await tx.user.update({
        where: { id: userId },

        data: {
          lobbyIds: Array.from(
            new Set([...(user?.lobbyIds ?? []), createdLobby.id]),
          ),
        },
      });

      await tx.leaderboardEntry.create({
        data: {
          leaderboardId: leaderboard.id,

          lobbyId: createdLobby.id,

          playerId: userId,
        },
      });

      return this.getLobbyByCodeFromClient(tx, lobbyCode);
    });
    await this.recalculateLeaderboard(
      this.prisma,
      lobby.id,
      lobby.leaderboard.id,
    );

    await this.publishLeaderboardUpdate(lobby.leaderboard);

    return lobby;
  }

  async startLobby(lobbyCode: string, userId: string) {
    const lobby = await this.prisma.lobby.findUnique({
      where: {
        lobbyCode: lobbyCode.trim().toUpperCase(),
      },
    });

    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }
    if (lobby.creatorUserId !== userId) {
      throw new ConflictException('Only the lobby creator can start the lobby');
    }
    if (lobby.lobbyStatus !== 'WAITING') {
      throw new ConflictException('Lobby has already started');
    }
    const updatedLobby = await this.prisma.lobby.update({
      where: { id: lobby.id },
      data: {
        lobbyStatus: 'ACTIVE',
      },
      include: {
        leaderboard: true,
      },
    });
    const lobbyist = await this.getLobbyByCodeFromClient(
      this.prisma,
      lobbyCode,
    );
    await this.publishLeaderboardUpdate(lobbyist.leaderboard);
    return updatedLobby;
  }

  async joinLobby(joinLobbyInput: JoinLobbyInput, userId: string) {
    await this.ensureUserExists(userId);
    const existingLobby = await this.prisma.lobby.findUnique({
      where: {
        lobbyCode: joinLobbyInput.lobbyCode.trim().toUpperCase(),
      },

      include: {
        leaderboard: true,
      },
    });
    if (!existingLobby || !existingLobby.leaderboard) {
      throw new NotFoundException('Lobby not found');
    }
    if (existingLobby.lobbyStatus !== 'WAITING') {
      throw new ConflictException(
        'Cannot join a lobby that has already started',
      );
    }
    const leaderboard = existingLobby.leaderboard;
    const lobby = await this.prisma.$transaction(async (tx) => {
      const nextParticipantIds = Array.from(
        new Set([...existingLobby.participantIds, userId]),
      );

      if (nextParticipantIds.length !== existingLobby.participantIds.length) {
        await tx.lobby.update({
          where: { id: existingLobby.id },

          data: {
            participantIds: {
              set: [...new Set([...existingLobby.participantIds, userId])],
            },
          },
        });

        const user = await tx.user.findUnique({
          where: { id: userId },

          select: { lobbyIds: true },
        });

        await tx.user.update({
          where: { id: userId },

          data: {
            lobbyIds: Array.from(
              new Set([...(user?.lobbyIds ?? []), existingLobby.id]),
            ),
          },
        });
      }

      await tx.leaderboardEntry.upsert({
        where: {
          leaderboardId_playerId: {
            leaderboardId: leaderboard.id,

            playerId: userId,
          },
        },

        update: {},

        create: {
          leaderboardId: leaderboard.id,

          lobbyId: existingLobby.id,

          playerId: userId,
        },
      });

      await this.recalculateLeaderboard(tx, existingLobby.id, leaderboard.id);
    });

    const lobbyist = await this.getLobbyByCodeFromClient(
      this.prisma,
      joinLobbyInput.lobbyCode,
    );
    await this.publishLeaderboardUpdate(lobbyist.leaderboard);
    return lobbyist;
  }

  async updateLeaderboard(
    updateLeaderboardInput: UpdateLeaderboardInput,

    userId: string,
  ) {
    const leaderboard = await this.prisma.$transaction(async (tx) => {
      const lobby = await this.getLobbyRecordOrThrow(
        tx,
        updateLeaderboardInput.lobbyCode,
      );

      const activeLeaderboard = lobby.leaderboard;

      if (!lobby.participantIds.includes(userId)) {
        throw new ConflictException('Player is not part of this lobby');
      }

      await tx.leaderboardEntry.upsert({
        where: {
          leaderboardId_playerId: {
            leaderboardId: activeLeaderboard.id,

            playerId: userId,
          },
        },

        update: {
          score: updateLeaderboardInput.score,

          correctAnswers: updateLeaderboardInput.correctAnswers ?? 0,

          incorrectAnswers: updateLeaderboardInput.incorrectAnswers ?? 0,

          streak: updateLeaderboardInput.streak ?? 0,
        },

        create: {
          leaderboardId: activeLeaderboard.id,

          lobbyId: lobby.id,

          playerId: userId,

          score: updateLeaderboardInput.score,

          correctAnswers: updateLeaderboardInput.correctAnswers ?? 0,

          incorrectAnswers: updateLeaderboardInput.incorrectAnswers ?? 0,

          streak: updateLeaderboardInput.streak ?? 0,
        },
      });

      await this.recalculateLeaderboard(tx, lobby.id, activeLeaderboard.id);

      return this.getLeaderboardByCodeFromClient(
        tx,
        updateLeaderboardInput.lobbyCode,
      );
    });

    await this.publishLeaderboardUpdate(leaderboard);

    return leaderboard;
  }
  async submitAnswer(submitAnswerInput: SubmitAnswerInput, userId: string) {
    const txResult = await this.prisma.$transaction(async (tx) => {
      const lobby = await this.getLobbyRecordOrThrow(
        tx,
        submitAnswerInput.lobbyCode,
      );

      if (lobby.lobbyStatus !== 'ACTIVE') {
        throw new ConflictException('Lobby is not active');
      }

      if (!lobby.participantIds.includes(userId)) {
        throw new ConflictException('Player is not part of this lobby');
      }

      const existingEntry = await tx.leaderboardEntry.findUnique({
        where: {
          leaderboardId_playerId: {
            leaderboardId: lobby.leaderboard.id,
            playerId: userId,
          },
        },
      });

      const nextScore = Math.max(
        0,
        (existingEntry?.score ?? 0) + submitAnswerInput.scoreDelta,
      );

      const nextCorrectAnswers =
        (existingEntry?.correctAnswers ?? 0) +
        (submitAnswerInput.isCorrect ? 1 : 0);

      const nextIncorrectAnswers =
        (existingEntry?.incorrectAnswers ?? 0) +
        (submitAnswerInput.isCorrect ? 0 : 1);

      const nextStreak = submitAnswerInput.isCorrect
        ? (existingEntry?.streak ?? 0) + 1
        : 0;

      await tx.leaderboardEntry.upsert({
        where: {
          leaderboardId_playerId: {
            leaderboardId: lobby.leaderboard.id,
            playerId: userId,
          },
        },
        update: {
          score: nextScore,
          correctAnswers: nextCorrectAnswers,
          incorrectAnswers: nextIncorrectAnswers,
          streak: nextStreak,
        },
        create: {
          leaderboardId: lobby.leaderboard.id,
          lobbyId: lobby.id,
          playerId: userId,
          score: nextScore,
          correctAnswers: nextCorrectAnswers,
          incorrectAnswers: nextIncorrectAnswers,
          streak: nextStreak,
        },
      });

      return {
        lobbyId: lobby.id,
        leaderboardId: lobby.leaderboard.id,
        lobbyCode: lobby.code,
      };
    });

    await this.recalculateLeaderboard(
      this.prisma,
      txResult.lobbyId,
      txResult.leaderboardId,
    );

    // 🔥 OUTSIDE TRANSACTION (no locking, faster)
    const leaderboard = await this.getLeaderboardByCodeFromClient(
      this.prisma,
      submitAnswerInput.lobbyCode,
    );

    const standing = leaderboard.entries.find(
      (entry) => entry.player.id === userId,
    );

    if (!standing) {
      throw new NotFoundException('Leaderboard entry not found');
    }

    const result = {
      lobbyCode: leaderboard.lobbyCode,
      lobbyStatus: leaderboard.lobbyStatus,

      isCorrect: submitAnswerInput.isCorrect,
      scoreDelta: submitAnswerInput.scoreDelta,
      standing,
      leaderboard,
      answeredAt: new Date(),
    };

    await this.publishLeaderboardUpdate(leaderboard);

    return result;
  }

  async getLobbyByCode(lobbyCode: string) {
    return this.getLobbyByCodeFromClient(this.prisma, lobbyCode);
  }

  async getLeaderboardByCode(lobbyCode: string) {
    return this.getLeaderboardByCodeFromClient(this.prisma, lobbyCode);
  }

  private async ensureUserExists(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async ensureFlashcardSetExists(flashCardSetId: string) {
    const flashCardSet = await this.prisma.flashcardSets.findUnique({
      where: { id: flashCardSetId },
    });

    if (!flashCardSet) {
      throw new NotFoundException('Flashcard set not found');
    }
  }

  private async resolveLobbyCode(preferredCode?: string) {
    const baseCode = preferredCode?.trim().toUpperCase();

    if (baseCode) {
      const existingLobby = await this.prisma.lobby.findUnique({
        where: { lobbyCode: baseCode },
      });

      if (existingLobby) {
        throw new ConflictException('Lobby code already exists');
      }

      return baseCode;
    }

    let generatedCode = '';

    do {
      generatedCode = Math.random().toString(36).slice(2, 8).toUpperCase();
    } while (
      await this.prisma.lobby.findUnique({
        where: { lobbyCode: generatedCode },
      })
    );

    return generatedCode;
  }

  private async recalculateLeaderboard(
    client: PrismaLobbyClient,

    lobbyId: string,

    leaderboardId: string,
  ) {
    const entries = await client.leaderboardEntry.findMany({
      where: {
        lobbyId,

        leaderboardId,
      },

      include: {
        player: {
          select: {
            username: true,

            fullname: true,
          },
        },
      },
    });

    const sortedEntries = [...entries].sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.correctAnswers !== left.correctAnswers) {
        return right.correctAnswers - left.correctAnswers;
      }

      if (right.streak !== left.streak) {
        return right.streak - left.streak;
      }

      const leftUpdatedAt = new Date(left.updatedAt).getTime();

      const rightUpdatedAt = new Date(right.updatedAt).getTime();

      if (leftUpdatedAt !== rightUpdatedAt) {
        return leftUpdatedAt - rightUpdatedAt;
      }

      return left.player.username.localeCompare(right.player.username);
    });

    await Promise.all(
      sortedEntries.map((entry, index) =>
        client.leaderboardEntry.update({
          where: { id: entry.id },

          data: {
            rank: index + 1,
          },
        }),
      ),
    );
  }

  private async getLobbyRecordOrThrow(
    client: PrismaLobbyClient,

    lobbyCode: string,
  ) {
    const lobby = await client.lobby.findUnique({
      where: {
        lobbyCode: lobbyCode.trim().toUpperCase(),
      },

      include: {
        leaderboard: true,
      },
    });

    if (!lobby || !lobby.leaderboard) {
      throw new NotFoundException('Lobby not found');
    }

    return lobby;
  }

  private async getLobbyByCodeFromClient(
    client: PrismaLobbyClient,

    lobbyCode: string,
  ) {
    const lobby = await client.lobby.findUnique({
      where: {
        lobbyCode: lobbyCode.trim().toUpperCase(),
      },

      include: {
        createdBy: {
          select: {
            id: true,

            username: true,

            fullname: true,
          },
        },

        participatingPlayers: {
          select: {
            id: true,

            username: true,

            fullname: true,
          },
        },

        leaderboard: {
          include: {
            entries: {
              include: {
                player: {
                  select: {
                    id: true,

                    username: true,

                    fullname: true,
                  },
                },
              },

              orderBy: {
                rank: 'asc',
              },
            },
          },
        },
      },
    });

    if (!lobby || !lobby.leaderboard) {
      throw new NotFoundException('Lobby not found');
    }

    return {
      ...lobby,

      leaderboard: {
        ...lobby.leaderboard,

        lobbyCode: lobby.lobbyCode,

        lobbyStatus: lobby.lobbyStatus,
      },
    };
  }

  private async getLeaderboardByCodeFromClient(
    client: PrismaLobbyClient,

    lobbyCode: string,
  ) {
    const lobby = await this.getLobbyByCodeFromClient(client, lobbyCode);

    return lobby.leaderboard;
  }

  private async publishLeaderboardUpdate(leaderboard: {
    id: string;

    lobbyId: string;

    lobbyCode: string;

    lobbyStatus: string;

    entries: unknown[];

    updatedAt: Date;
  }) {
    await lobbyPubSub.publish('leaderboard.updated', {
      leaderboardUpdated: leaderboard,
    });
  }
}
