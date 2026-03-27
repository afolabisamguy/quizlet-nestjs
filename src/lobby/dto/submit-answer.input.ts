import { Field, InputType, Int } from '@nestjs/graphql';

import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class SubmitAnswerInput {
  @Field()
  @IsString()
  lobbyCode: string;

  @Field()
  @IsBoolean()
  isCorrect: boolean;

  @Field(() => Int)
  @IsInt()
  scoreDelta: number;
}
