import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FlashCardSets } from 'src/flashcard-sets/entities/flashcard-sets.entity';

@ObjectType()
export class User {
  @Field({ description: 'Id of the user' })
  id: string;

  @Field(() => String, {
    description: 'The full name of the user',
  })
  fullname: string;

  @Field(() => String, {
    description: 'The password of the user',
  })
  password: string;

  @Field(() => String, {
    description: 'The email of the user',
  })
  email: string;

  @Field(() => [FlashCardSets])
  flashcardSets: FlashCardSets[];
}
