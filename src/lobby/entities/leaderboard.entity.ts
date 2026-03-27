import { Field, ObjectType } from '@nestjs/graphql';

import { LeaderboardEntry } from './leaderboard-entry.entity';

@ObjectType()
export class Leaderboard {
  @Field()
  id: string;

  @Field()
  lobbyId: string;

  @Field()
  lobbyCode: string;

  @Field()
  lobbyStatus: string;

  @Field(() => [LeaderboardEntry])
  entries: LeaderboardEntry[];

  @Field()
  updatedAt: Date;
}
