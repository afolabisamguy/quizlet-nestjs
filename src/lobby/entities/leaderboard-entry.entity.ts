import { Field, Int, ObjectType } from '@nestjs/graphql';

import { LobbyPlayer } from './lobby-player.entity';

@ObjectType()
export class LeaderboardEntry {
  @Field()
  id: string;

  @Field()
  lobbyId: string;

  @Field(() => LobbyPlayer)
  player: LobbyPlayer;

  @Field(() => Int)
  rank: number;

  @Field(() => Int)
  score: number;

  @Field(() => Int)
  correctAnswers: number;

  @Field(() => Int)
  incorrectAnswers: number;

  @Field(() => Int)
  streak: number;

  @Field()
  updatedAt: Date;
}
