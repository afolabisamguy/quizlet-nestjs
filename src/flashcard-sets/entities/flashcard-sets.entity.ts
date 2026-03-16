import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/auth.entity';
import { Flashcards } from 'src/flashcards/entities/flashcards.entities';
import { Lobby } from 'src/lobby/entity/lobby.entity';

@ObjectType()
export class FlashCardSets {
  @Field({ description: 'The id of the flashcard set' })
  id: string;

  @Field(() => User, { description: "The flashcard set's creator" })
  user: User;

  @Field({ description: 'The subject for the flashcard set.' })
  subject: string;

  @Field(() => Flashcards, {
    description: 'The flashcards in the flashcard set',
  })
  flashcards: Flashcards;

  @Field(() => Int, {
    description: 'The number of flashcards in the flashcard set',
  })
  numberOfCards: number;

  @Field(() => Lobby, {
    description: 'The lobby that the flashcard set is being used in',
  })
  lobby: Lobby;
}
