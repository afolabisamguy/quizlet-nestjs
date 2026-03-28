import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class FlashcardItemInput {
  @Field()
  @IsString()
  question: string;

  @Field()
  @IsString()
  answer: string;
}
