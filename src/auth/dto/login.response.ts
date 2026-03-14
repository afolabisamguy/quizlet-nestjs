import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/auth.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
