import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Leaderboard } from './leaderboard.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Lobby } from './lobby.entity';

@ObjectType()
export class LeaderboardEntry {
  @Field({})
  id: string;

  @Field(() => Int, {})
  score: number;

  @Field(() => Int, {})
  correctAnswers: number;

  @Field(() => Int, {})
  incorrectAnswers: number;

  @Field(() => Int, {})
  rank: number;

  @Field(() => LeaderboardEntry, {})
  entries: LeaderboardEntry;

  @Field(() => Leaderboard, {})
  leaderboard: Leaderboard;

  @Field(() => User, {})
  player: User;

  @Field(() => Lobby, {})
  lobby: Lobby;
}
