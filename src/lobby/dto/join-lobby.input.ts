import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class JoinLobbyInput {
  @Field()
  @IsString()
  lobbyCode: string;
}
