import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Leaderboard } from './leaderboard.entity';
import { LeaderboardEntry } from './leaderboard-entry.entity';

@ObjectType()
export class AnsweredQuestion {
  @Field()
  lobbyCode: string;

  @Field()
  lobbyStatus: string;

  @Field()
  flashcardId: string;

  @Field()
  question: string;

  @Field()
  answer: string;

  @Field()
  isCorrect: boolean;

  @Field(() => Int)
  scoreDelta: number;

  @Field(() => LeaderboardEntry)
  standing: LeaderboardEntry;

  @Field(() => Leaderboard)
  leaderboard: Leaderboard;

  @Field()
  answeredAt: Date;
}
