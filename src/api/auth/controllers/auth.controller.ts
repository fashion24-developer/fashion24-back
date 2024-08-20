import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';

import { ServiceTokenDto } from '../dtos/service-token.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':provider/login')
  naverLogin(
    @Param('provider') provider: UserProvider,
    @Query('code') authorizeCode: string
  ): Promise<ServiceTokenDto> {
    return this.authService.login(provider, authorizeCode);
  }
}
