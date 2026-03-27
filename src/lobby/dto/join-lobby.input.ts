import { Field, InputType } from '@nestjs/graphql';

import { IsString, Length } from 'class-validator';

@InputType()
export class JoinLobbyInput {
  @Field()
  @IsString()
  @Length(4, 12)
  lobbyCode: string;
}
