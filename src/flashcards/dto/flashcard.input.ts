import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FlashCardInput {
  @Field()
  @IsString()
  question: string;

  @Field()
  @IsString()
  answer: string;

  @Field()
  @IsString()
  flashCardSetId: string;

  @Field()
  @IsString()
  @IsOptional()
  flashCardId?: string;
}
