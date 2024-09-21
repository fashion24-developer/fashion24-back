export class ServiceTokenDto {
  accessToken: string;
  refreshToken: string | null;

  constructor(props: Partial<ServiceTokenDto> & Required<Pick<ServiceTokenDto, 'accessToken'>>) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken ? props.refreshToken : null;
  }
}
