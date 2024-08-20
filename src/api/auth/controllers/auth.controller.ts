import { Controller, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { AuthService } from '@src/api/auth/services/auth.service';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';

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
