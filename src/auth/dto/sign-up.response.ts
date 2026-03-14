import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/auth.entity';

@ObjectType()
export class SignUpResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
