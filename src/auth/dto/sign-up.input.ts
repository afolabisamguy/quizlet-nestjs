import { Field, InputType } from '@nestjs/graphql';

import { IsEmail, IsNumber, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  fullname: string;

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  username: string;
}
