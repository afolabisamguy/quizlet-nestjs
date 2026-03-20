import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLobbyInput } from './dto/create-lobby.input';
import { C } from 'node_modules/graphql-ws/dist/common-DY-PBNYy.cjs';
import { retry } from 'rxjs';
import { JoinLobbyInput } from './dto/join-lobby.input';
import { Leaderboard } from './entity/leaderboard.entity';
import { existsSync } from 'fs';
import { UpdateLeaderboardInput } from './dto/update-leaderboard.input';
import { PrismaClient } from '@prisma/client';
type PrismaLobbyClient = any;
@Injectable()
export class LobbyService {
  constructor(private prismaService: PrismaService) {}

  async createLobby(CreateLobbyInput: CreateLobbyInput, userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const flashExists = await this.prismaService.flashcardSets.findUnique({
      where: {
        id: CreateLobbyInput.flashcardSetId,
      },
    });
    if (!flashExists) {
      throw new NotFoundException('Flashcard set does not exist');
    }
    const lobbyCode = 'Create a function to handle ';

    const lobby = await this.prismaService.$transaction(async (tx) => {
      const createLobby = await tx.lobby.create({
        data: {
          lobbyCode,
          lobbyStatus: 'WAITING',
          creatorUserId: userId,
          flashCardSetId: CreateLobbyInput.flashcardSetId,
        },
      });
      const leaderboard = await tx.leaderboard.create({
        data: {
          lobbyId: createLobby.id,
        },
      });
      const LeaderboardEntry = await tx.leaderboardEntry.create({
        data: {
          leaderboardId: leaderboard.id,
          lobbyId: createLobby.id,
          playerId: userId, // we need to make this a choice
        },
      });
    });

    return lobby;

    // transactions in prisma or in a database query guarantee us that if a request or a query fails in the transaction
    // even if it is the last query, all the queries in the transaction are going to fail.
  }

  async joinLobby(joinLobbyInput: JoinLobbyInput, userId: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const lobby = await this.prismaService.$transaction(async (tx) => {
      const exoistingLobby = await tx.lobby.findUnique({
        where: {
          lobbyCode: joinLobbyInput.lobbyCode,
        },
        include: {
          leaderboard: true,
        },
      });
      if (!exoistingLobby) {
        throw new NotFoundException(
          'Lobby not found. Try entering the code again',
        );
      }
      const leaderboard = exoistingLobby.leaderboard!;
      const updatedLobby = await tx.lobby.update({
        where: {
          id: exoistingLobby.id,
        },
        data: {
          participantIds: {
            set: [...new Set([...exoistingLobby.participantIds, userId])],
          }, // we need to change this later
        },
      });
      // const updatedUser = await tx.lobby.update({
      //   where: {
      //     id: userId,
      //   },
      //   data: {
      //     lobbyIds
      //   },
      // });
      const leaderboardEntry = await tx.leaderboardEntry.upsert({
        where: {
          leaderboardId_playerId: {
            leaderboardId: leaderboard.id,
            playerId: userId,
          },
        },
        update: {},
        create: {
          leaderboardId: leaderboard.id,
          lobbyId: exoistingLobby.id,
          playerId: userId,
        },
      });
    });
    // we need to create a function that reshuffles the leaderboard
    // use the pubSub to broadcast that a player has joined the lobby

    // const leaderboardEntry = await this.prismaService.leaderboardEntry.upsert({
    //     where:{
    //         leaderboardId: lobby.leaderboard!.id
    //     }
    // })
  }

  async updateLeaderboard(
    updateLeaderboardInput: UpdateLeaderboardInput,
    userId: string,
  ) {
    const lobby = await this.prismaService.lobby.findUnique({
      where: {
        lobbyCode: updateLeaderboardInput.lobbyCode,
      },
      include: {
        leaderboard: true,
      },
    });
    if (!lobby || !lobby.leaderboard) {
      throw new NotFoundException('Lobby not found');
    }
    const leaderboard = lobby.leaderboard;
    const existingLeaderboard = await this.prismaService.$transaction(
      async (tx) => {
        const leaderboardEntry = await tx.leaderboardEntry.upsert({
          where: {
            leaderboardId_playerId: {
              leaderboardId: leaderboard.id,
              playerId: userId,
            },
          },
          update: {
            score: updateLeaderboardInput.score,
            correctAnswers: updateLeaderboardInput.correctAnswers,
            incorrectAnswers: updateLeaderboardInput.incorrectAnswers,
          },
          create: {
            leaderboardId: leaderboard.id,
            lobbyId: lobby.id,
            playerId: userId,
            score: updateLeaderboardInput.score,
            correctAnswers: updateLeaderboardInput.correctAnswers,
            incorrectAnswers: updateLeaderboardInput.incorrectAnswers,
          },
          // create a function to shuffle or rearrand the leaderboard
          // publish the changes with pubsub
        });
      },
    );
  }

  private async reshuffleLeaderboard(
    client: PrismaLobbyClient,
    lobbyId: string,
    leaderboardId: string,
  ) {
    const entries = await client.leaderboardEntry.findMany({
      where: {
        lobbyId: lobbyId,
        leaderboardId: leaderboardId,
      },
      include: {
        player: { select: { userName: true, fullName: true } },
      },
    });
    const sortedEntries = [...entries].sort((a, b) => {
      if (a.score !== b.score) {
        a.score = b.score;
      }
      if (a.correctAnswers !== b.correctAnswers) {
        a.correctAnswers = b.correctAnswers;
      }
      if (a.streak !== b.streak) {
        a.streak = b.streak;
      }
      const bUpdatedAt = new Date(b.updatedAt).getTime();
      const AUpdatedAt = new Date(a.updatedAt).getTime();
      if (AUpdatedAt !== bUpdatedAt) {
        return AUpdatedAt - bUpdatedAt;
      }
      return a.player.userName.localeCompare(b.player.userName);
    });
    await Promise.all(
      sortedEntries.map((entry, index) =>
        client.leaderboardEntry.update({
          where: {
            id: entry.id,
          },
          data: {
            rank: index + 1,
          },
        }),
      ),
    );
  }
}
