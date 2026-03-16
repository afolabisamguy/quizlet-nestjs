import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lobby } from './lobby.entity';
import { LeaderboardEntry } from './leaderboard-entry.entity';

@ObjectType()
export class Leaderboard {
  @Field({})
  id: string;

  @Field(() => Lobby, {})
  lobby: Lobby;

  @Field(() => LeaderboardEntry, {})
  entries: LeaderboardEntry;
}
