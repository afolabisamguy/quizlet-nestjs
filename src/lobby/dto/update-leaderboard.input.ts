import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UpdateLeaderboardInput {
  @Field()
  @IsString()
  lobbyCode: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  score: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  correctAnswers?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  incorrectAnswers?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  streak?: number;
}
