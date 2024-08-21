import { Controller, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { AuthService } from '@src/api/auth/services/auth.service';
import { LoginParamDto, LoginQueryDto } from '@src/api/users/dtos/login.dto';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post(':provider/login')
  naverLogin(
    @Param() param: LoginParamDto,
    @Query() query: LoginQueryDto
  ): Promise<ServiceTokenDto> {
    return this.authService.login(param.provider, query.authorizeCode);
  }
}
