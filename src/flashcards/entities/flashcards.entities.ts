import { Field, ObjectType } from '@nestjs/graphql';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';

@ObjectType()
export class Flashcards {
  @Field({ description: 'The id of the flashcard' })
  id: string;

  @Field({ description: 'The set the flashcard is in' })
  flashcardSet: FlashCardSets;

  @Field({ description: 'The question of the flashcard.' })
  question: string;

  @Field({ description: 'The answer of the flashcard.' })
  answer: string;
}
