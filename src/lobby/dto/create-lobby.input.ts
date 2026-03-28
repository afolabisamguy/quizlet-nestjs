import { Field, InputType } from '@nestjs/graphql';

import { IsMongoId, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateLobbyInput {
  @Field()
  @IsMongoId()
  flashCardSetId: string;
}
