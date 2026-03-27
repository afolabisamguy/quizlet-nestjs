import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';

import { LobbyService } from './lobby.service';

import { Lobby } from './entities/lobby.entity';

import { Leaderboard } from './entities/leaderboard.entity';
import { AnsweredQuestion } from './entities/answered-question.entity';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateLobbyInput } from './dto/create-lobby.input';

import { JoinLobbyInput } from './dto/join-lobby.input';

import { UpdateLeaderboardInput } from './dto/update-leaderboard.input';
import { SubmitAnswerInput } from './dto/submit-answer.input';

import { lobbyPubSub } from './lobby.pubsub';

@Resolver()
export class LobbyResolver {
  constructor(private readonly lobbyService: LobbyService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Lobby)
  createLobby(
    @Args('createLobbyInput') createLobbyInput: CreateLobbyInput,

    @Context() context,
  ) {
    return this.lobbyService.createLobby(createLobbyInput, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Lobby)
  joinLobby(
    @Args('joinLobbyInput') joinLobbyInput: JoinLobbyInput,

    @Context() context,
  ) {
    return this.lobbyService.joinLobby(joinLobbyInput, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Lobby)
  startLobby(@Args('lobbyCode') lobbyCode: string, @Context() context) {
    return this.lobbyService.startLobby(lobbyCode, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Leaderboard)
  updateLeaderboard(
    @Args('updateLeaderboardInput')
    updateLeaderboardInput: UpdateLeaderboardInput,

    @Context() context,
  ) {
    return this.lobbyService.updateLeaderboard(
      updateLeaderboardInput,

      context.req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AnsweredQuestion)
  submitAnswer(
    @Args('submitAnswerInput') submitAnswerInput: SubmitAnswerInput,

    @Context() context,
  ) {
    return this.lobbyService.submitAnswer(
      submitAnswerInput,

      context.req.user.id,
    );
  }

  @Query(() => Lobby, { name: 'lobby' })
  lobby(@Args('lobbyCode') lobbyCode: string) {
    return this.lobbyService.getLobbyByCode(lobbyCode);
  }

  @Query(() => Leaderboard, { name: 'leaderboard' })
  leaderboard(@Args('lobbyCode') lobbyCode: string) {
    return this.lobbyService.getLeaderboardByCode(lobbyCode);
  }

  @Subscription(() => Leaderboard, {
    filter: (payload, variables) =>
      payload.leaderboardUpdated.lobbyCode ===
      variables.lobbyCode.trim().toUpperCase(),

    resolve: (payload) => payload.leaderboardUpdated,
  })
  leaderboardUpdated(@Args('lobbyCode') lobbyCode: string) {
    void lobbyCode;

    return lobbyPubSub.asyncIterableIterator('leaderboard.updated');
  }
}
