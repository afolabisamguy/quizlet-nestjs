import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { SignUpInput } from './dto/sign-up.input';

import { SignUpResponse } from './dto/sign-up.response';

import { LoginInput } from './dto/login.input';

import { LoginResponse } from './dto/login.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput.email, loginInput.password);
  }
}
