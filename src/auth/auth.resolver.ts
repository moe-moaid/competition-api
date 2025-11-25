import { Resolver, Mutation, Args } from '@nestjs/graphql';
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
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.login(email, password);
  }
}
