import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLobbyInput {
  @Field()
  @IsString()
  flashcardSetId: string;
}
