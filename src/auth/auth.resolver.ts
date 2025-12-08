import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signup(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('phone') phone: string,
    @Args('country') country: string,
    @Args('address') address: string,
    @Args('avatar') avatar: number,
  ) {
    return this.authService.signup({
      name,
      email,
      password,
      phone,
      country,
      address,
      avatar,
    });
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      email,
      password,
    );

    context.res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      accessToken,
    };
  }
}
