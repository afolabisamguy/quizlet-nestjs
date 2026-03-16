import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLobbyInput } from './dto/create-lobby.input';
import { C } from 'node_modules/graphql-ws/dist/common-DY-PBNYy.cjs';
import { retry } from 'rxjs';
import { JoinLobbyInput } from './dto/join-lobby.input';
import { Leaderboard } from './entity/leaderboard.entity';

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
    const lobby = await this.prismaService.lobby.create({
      data: {
        lobbyCode,
        lobbyStatus: 'WAITING',
        creatorUserId: userId,
        flashCardSetId: CreateLobbyInput.flashcardSetId,
      },
    });
    const leaderboard = await this.prismaService.leaderboard.create({
      data: {
        lobbyId: lobby.id,
      },
    });
    const LeaderboardEntry = await this.prismaService.leaderboardEntry.create({
      data: {
        leaderboardId: leaderboard.id,
        lobbyId: lobby.id,
        playerId: userId, // we need to make this a choice
      },
    });
    return lobby;
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
    const lobby = await this.prismaService.lobby.findUnique({
      where: {
        lobbyCode: joinLobbyInput.lobbyCode,
      },
      include: {
        leaderboard: true,
      },
    });
    if (!lobby) {
      throw new NotFoundException(
        'Lobby not found. Try entering the code again',
      );
    }
    const updatedLobby = await this.prismaService.lobby.update({
      where: {
        id: lobby.id,
      },
      data: {
        participantIds: [userId], // we need to change this later
      },
    });
    // const leaderboardEntry = await this.prismaService.leaderboardEntry.upsert({
    //     where:{
    //         leaderboardId: lobby.leaderboard!.id
    //     }
    // })
  }
}
