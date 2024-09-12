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
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { AuthService } from '@src/api/auth/services/auth.service';
import { IAuthService } from '@src/api/auth/services/i-auth-service.interface';
import { AuthParamDto } from '@src/api/users/dtos/auth.dto';
import { globalPrefix } from '@src/bootstrap.service';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { ResponseDto } from '@src/common/dtos/response.dto';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';
import { ExistsPipe } from '@src/common/pipes/exists.pipe';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('auth')
@Controller(routesV1.version)
export class AuthController {
  static path = `/${globalPrefix}/${routesV1.version}/${routesV1.auth.root}`;

  constructor(@Inject(AuthService) private readonly authService: IAuthService) {}

  @ApiAuth.Login({ summary: '소셜 로그인' })
  @UseInterceptors(CookieInterceptor)
  @Post(routesV1.auth.login)
  login(
    @Param() param: AuthParamDto,
    @Query('code', ExistsPipe) authorizeCode: string
  ): Promise<ServiceTokenDto> {
    return this.authService.login(param.provider, authorizeCode);
  }

  @ApiAuth.Logout({ summary: '로그아웃' })
  @UseGuards(AccessTokenAuthGuard)
  @Post(routesV1.auth.logout)
  logout(@Param() param: AuthParamDto, @GetUserId() userId: number): Promise<ResponseDto> {
    return this.authService.logout(param.provider, userId);
  }

  @ApiAuth.GetNewAccessToken({ summary: '새 액세스 토큰 발급' })
  @UseInterceptors(CookieInterceptor)
  @UseGuards(RefreshTokenAuthGuard)
  @Get(routesV1.auth.generateNewAccessToken)
  getNewAccessToken(@GetUserId() userId: number): Promise<ServiceTokenDto> {
    return this.authService.generateNewAccessToken(userId);
  }
}
