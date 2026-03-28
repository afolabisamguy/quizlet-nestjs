import { Field, ObjectType } from '@nestjs/graphql';

import { Leaderboard } from './leaderboard.entity';

import { LobbyPlayer } from './lobby-player.entity';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';

@ObjectType()
export class Lobby {
  @Field()
  id: string;

  @Field()
  lobbyCode: string;

  @Field()
  lobbyStatus: string;

  @Field()
  flashCardSet: FlashCardSets;

  @Field(() => LobbyPlayer)
  createdBy: LobbyPlayer;

  @Field(() => [LobbyPlayer])
  participatingPlayers: LobbyPlayer[];

  @Field(() => Leaderboard)
  leaderboard: Leaderboard;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
