import { Field, InputType } from '@nestjs/graphql';

import { IsString } from 'class-validator';

@InputType()
export class FlashCardSetsInput {
  @Field()
  @IsString()
  subject: string;
}
