import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FlashcardItemInput } from 'src/flashcards/dto/flashcard-item.input';

@InputType()
export class FlashCardSetsInput {
  @Field()
  @IsString()
  subject: string;

  @Field(() => [FlashcardItemInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FlashcardItemInput)
  flashcards?: FlashcardItemInput[];
}
