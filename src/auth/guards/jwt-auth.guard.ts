import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // we are transforming the standard execution context into a graphql aware one
    const ctx = GqlExecutionContext.create(context);
    // we are returning the http request inside the graphql context
    return ctx.getContext().req;
  }
}
