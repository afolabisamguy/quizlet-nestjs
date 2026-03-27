import { Field, InputType } from '@nestjs/graphql';

import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FlashCardInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  question: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  answer: string;

  @Field()
  @IsString()
  flashCardSetId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  flashCardId?: string;
}
