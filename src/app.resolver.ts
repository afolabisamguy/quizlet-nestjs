import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  getHello() {
    return 'Hello World!';
  }
}
