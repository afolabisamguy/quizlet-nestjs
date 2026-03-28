import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

import { FlashcardItemInput } from './flashcard-item.input';

@InputType()
export class CreateFlashcardsInput {
  @Field()
  @IsString()
  flashCardSetId: string;

  @Field(() => [FlashcardItemInput])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FlashcardItemInput)
  flashcards: FlashcardItemInput[];
}
