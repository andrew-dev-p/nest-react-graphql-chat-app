import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { RegisterResponse, LoginResponse } from './auth.entity';
import { Response, Request } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args() registerDto: RegisterDto,
    @Context()
    context: {
      res: Response;
    },
  ) {
    return this.authService.register(registerDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args() loginDto: LoginDto,
    @Context()
    context: {
      res: Response;
    },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation()
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    return this.authService.refreshToken(context.req, context.res);
  }
}
