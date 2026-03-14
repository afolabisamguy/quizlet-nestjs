import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/auth.entity';
import { Flashcards } from 'src/flashcards/entities/flashcards.entities';

@ObjectType()
export class FlashCardSets {
  @Field({ description: 'The id of the flashcard set' })
  id: string;

  @Field({ description: "The flashcard set's creator" })
  user: User;

  @Field({ description: 'The subject for the flashcard set.' })
  subject: string;

  @Field({ description: 'The flashcards in the flashcard set' })
  flashcards: Flashcards;
}
