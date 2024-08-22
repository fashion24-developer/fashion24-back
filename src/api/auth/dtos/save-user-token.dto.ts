export class SaveUserTokenDto {
  userId: number;
  accessToken: string;
  refreshToken: string;
  socialAccessToken: string;
  socialRefreshToken: string;
}
