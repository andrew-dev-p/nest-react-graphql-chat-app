import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { RegisterResponse, LoginResponse } from './auth.entity';
import { Response, Request } from 'express';
import { UseFilters } from '@nestjs/common';
import { GraphQLErrorFilter } from '../filters/custom-exception-filter';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerInput: RegisterDto,
    @Context()
    context: {
      res: Response;
    },
  ) {
    return this.authService.register(registerInput, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginDto,
    @Context()
    context: {
      res: Response;
    },
  ) {
    return this.authService.login(loginInput, context.res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    return this.authService.refreshToken(context.req, context.res);
  }
}
