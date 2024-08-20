import { Controller, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';

import { ServiceTokenDto } from '../dtos/service-token.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post(':provider/login')
  naverLogin(
    @Param('provider') provider: UserProvider,
    @Query('code') authorizeCode: string
  ): Promise<ServiceTokenDto> {
    return this.authService.login(provider, authorizeCode);
  }
}
