import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/auth.entity';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardEntry } from './leaderboard-entry.entity';

@ObjectType()
export class Lobby {
  @Field({})
  id: string;

  @Field(() => [User], {})
  participatingPlayers: User[];

  @Field(() => FlashCardSets, {})
  flashcardSets: FlashCardSets;

  @Field({})
  lobbyStatus: string;

  @Field({})
  lobbyCode: string;

  @Field(() => Leaderboard, {})
  leaderboard: Leaderboard;

  @Field(() => User, {})
  createdBy: User;

  @Field(() => [LeaderboardEntry], {})
  leaderboardEntries: LeaderboardEntry[];
}
