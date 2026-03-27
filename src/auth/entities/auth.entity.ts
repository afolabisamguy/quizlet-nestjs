import { Field, ObjectType } from '@nestjs/graphql';

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
    description: 'The username of the user',
  })
  username: string;

  @Field(() => String, {
    description: 'The email of the user',
  })
  email: string;

  @Field(() => [FlashCardSets], { nullable: true })
  flashcardSets: FlashCardSets[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
