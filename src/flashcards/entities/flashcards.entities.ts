import { Field, ObjectType } from '@nestjs/graphql';

import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';

@ObjectType()
export class Flashcards {
  @Field({ description: 'The id of the flashcard' })
  id: string;

  @Field({ description: 'The flashcard set id' })
  flashcardSetId: string;

  @Field(() => FlashCardSets, {
    description: 'The set the flashcard is in',

    nullable: true,
  })
  flashcardSet?: FlashCardSets;

  @Field({ description: 'The question of the flashcard.' })
  question: string;

  @Field({ description: 'The answer of the flashcard.' })
  answer: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updateAt?: Date;
}
