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

import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { RefreshTokenAuthGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { AuthService } from '@src/api/auth/services/auth.service';
import { IAuthService } from '@src/api/auth/services/i-auth-service.interface';
import { LoginParamDto } from '@src/api/users/dtos/login.dto';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { CookieInterceptor } from '@src/common/interceptors/cookie.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: IAuthService) {}

  @UseInterceptors(CookieInterceptor)
  @Post(':provider/login')
  login(
    @Param() param: LoginParamDto,
    @Query('code') authorizeCode: string
  ): Promise<ServiceTokenDto> {
    return this.authService.login(param.provider, authorizeCode);
  }

  @UseInterceptors(CookieInterceptor)
  @UseGuards(RefreshTokenAuthGuard)
  @Get('new-access-token')
  getNewAccessToken(@GetUserId() userId: number): ServiceTokenDto {
    return this.authService.generateNewAccessToken(userId);
  }
}
