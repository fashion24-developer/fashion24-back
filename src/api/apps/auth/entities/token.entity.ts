interface UserTokenCreateProps {
  userId: number;
  socialAccessToken: string;
  socialRefreshToken: string;
}

export class UserTokenEntity {
  /**
   * Primary Key
   */
  private readonly _id?: number;
  /**
   * 유저 아이디 (FK)
   */
  private readonly _userId: number;
  /**
   * 소셜 액세스 토큰
   */
  private _socialAccessToken: string;
  /**
   * 소셜 리프레시 토큰
   */
  private _socialRefreshToken: string;
  /**
   * 생성일
   */
  private readonly _createdAt: Date;
  /**
   * 토큰 소유 유저
   */
  private readonly _user: unknown | null;

  get id(): number | undefined {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get socialAccessToken(): string {
    return this._socialAccessToken;
  }

  get socialRefreshToken(): string {
    return this._socialRefreshToken;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get user(): unknown | null {
    return this._user;
  }

  getProps(): {
    id: number;
    userId: number;
    socialAccessToken: string;
    socialRefreshToken: string;
    createdAt: Date;
    user: unknown;
  } {
    return {
      id: this._id,
      userId: this._userId,
      socialAccessToken: this._socialAccessToken,
      socialRefreshToken: this._socialRefreshToken,
      createdAt: this._createdAt,
      user: this._user
    };
  }

  static create(createProps: UserTokenCreateProps): UserTokenEntity {
    return new UserTokenEntity({
      userId: createProps.userId,
      socialAccessToken: createProps.socialAccessToken,
      socialRefreshToken: createProps.socialRefreshToken
    });
  }

  constructor(props: {
    id?: number;
    userId: number;
    socialAccessToken: string;
    socialRefreshToken: string;
    createdAt?: Date;
    user?: unknown;
  }) {
    const { id, userId, socialAccessToken, socialRefreshToken, createdAt, user } = props;

    const now = new Date();

    this._id = id || undefined;
    this._userId = userId;
    this._socialAccessToken = socialAccessToken;
    this._socialRefreshToken = socialRefreshToken;
    this._createdAt = createdAt || now;
    this._user = user ? user : null;
  }
}
