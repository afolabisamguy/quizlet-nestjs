import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateLeaderboardInput {
  @Field()
  @IsString()
  lobbyCode: string;

  @Field(() => Int)
  @IsInt()
  score: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  correctAnswers?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  incorrectAnswers?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  streak?: number;
}
