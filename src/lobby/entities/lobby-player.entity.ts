import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LobbyPlayer {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  fullname: string;
}
