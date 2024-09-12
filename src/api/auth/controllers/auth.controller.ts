import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiAuth } from '@src/api/auth/controllers/auth.swagger';
import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { RefreshTokenAuthGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { IAuthService } from '@src/api/auth/services/i-auth-service.interface';
import { LoginParamDto } from '@src/api/users/dtos/login.dto';
import { AUTH_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';
import { ExistsPipe } from '@src/common/pipes/exists.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE_DI_TOKEN) private readonly authService: IAuthService) {}

  @ApiAuth.Login({ summary: '소셜 로그인' })
  @UseInterceptors(CookieInterceptor)
  @Post(':provider/login')
  login(
    @Param() param: LoginParamDto,
    @Query('code', ExistsPipe) authorizeCode: string
  ): Promise<ServiceTokenDto> {
    return this.authService.login(param.provider, authorizeCode);
  }

  @ApiAuth.GetNewAccessToken({ summary: '새 액세스 토큰 발급' })
  @UseInterceptors(CookieInterceptor)
  @UseGuards(RefreshTokenAuthGuard)
  @Get('new-access-token')
  getNewAccessToken(@GetUserId() userId: number): Promise<ServiceTokenDto> {
    return this.authService.generateNewAccessToken(userId);
  }
}
