import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from 'src/auth/entities/auth.entity';

import { Flashcards } from 'src/flashcards/entities/flashcards.entities';

@ObjectType()
export class FlashCardSets {
  @Field({ description: 'The id of the flashcard set' })
  id: string;

  @Field({ description: 'The user id of the flashcard set creator' })
  userId: string;

  @Field({ description: 'The subject for the flashcard set.' })
  subject: string;

  @Field(() => Int, {
    description: 'The total number of cards in the flashcard set',
  })
  numberOfCards: number;

  @Field(() => [Flashcards], {
    description: 'The flashcards in the flashcard set',

    nullable: true,
  })
  flashcards?: Flashcards[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
