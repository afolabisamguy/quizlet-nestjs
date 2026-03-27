import { Field, ObjectType } from '@nestjs/graphql';

import { Leaderboard } from './leaderboard.entity';

import { LobbyPlayer } from './lobby-player.entity';

@ObjectType()
export class Lobby {
  @Field()
  id: string;

  @Field()
  lobbyCode: string;

  @Field()
  lobbyStatus: string;

  @Field()
  flashCardSetId: string;

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
