import { Field, InputType } from '@nestjs/graphql';

import { IsEmail, IsNumber, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
