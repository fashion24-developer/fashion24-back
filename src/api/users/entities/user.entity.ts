import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { UserRole } from '@src/api/users/enums/user-role.enum';
import { ValueOf } from '@src/common/types/common.type';

interface UserCreateProps {
  nickname: string;
  email: string;
  phone?: string | null;
  provider: ValueOf<typeof UserProvider>;
  uniqueId: string;
}

export class UserEntity {
  private readonly _id?: number;
  private _nickname: string;
  private _email: string;
  private _phone: string | null;
  private _rank: number;
  private _point: number;
  private _provider: ValueOf<typeof UserProvider>;
  private _role: ValueOf<typeof UserRole>;
  private readonly _uniqueId: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  get id(): number | undefined {
    return this._id;
  }

  get nickname(): string {
    return this._nickname;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string | null {
    return this._phone;
  }

  get rank(): number {
    return this._rank;
  }

  get provider(): ValueOf<typeof UserProvider> {
    return this._provider;
  }

  get role(): ValueOf<typeof UserRole> {
    return this._role;
  }

  get uniqueId(): string {
    return this._uniqueId;
  }

  get point(): number {
    return this._point;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  getProps(): {
    id: number;
    nickname: string;
    email: string;
    phone: string | null;
    rank: number;
    provider: ValueOf<typeof UserProvider>;
    role: ValueOf<typeof UserRole>;
    uniqueId: string;
    point: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  } {
    return {
      id: this._id,
      nickname: this._nickname,
      email: this._email,
      phone: this._phone,
      rank: this._rank,
      provider: this._provider,
      role: this._role,
      uniqueId: this.uniqueId,
      point: this._point,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt
    };
  }

  update(
    props: Partial<Pick<UserEntity, 'rank' | 'email' | 'nickname' | 'phone' | 'point' | 'role'>>
  ) {
    const { rank, point, role, email, nickname, phone } = props;

    const now = new Date();

    if (rank) {
      this._rank = rank;
      this._updatedAt = now;
    }

    if (point) {
      this._point = point;
      this._updatedAt = now;
    }

    if (role) {
      this._role = role;
      this._updatedAt = now;
    }

    if (nickname) {
      this._nickname = nickname;
      this._updatedAt = now;
    }

    if (phone) {
      this._phone = phone;
      this._updatedAt = now;
    }

    if (email) {
      this._email = email;
      this._updatedAt = now;
    }
  }

  static create(createProps: UserCreateProps): UserEntity {
    return new UserEntity({
      nickname: createProps.nickname,
      email: createProps.email,
      phone: createProps.phone || null,
      rank: 1,
      point: 0,
      provider: createProps.provider,
      role: UserRole.USER,
      uniqueId: createProps.uniqueId
    });
  }

  constructor(props: {
    id?: number;
    nickname: string;
    email: string;
    phone: string | null;
    rank: number;
    point: number;
    provider: ValueOf<typeof UserProvider>;
    role: ValueOf<typeof UserRole>;
    uniqueId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }) {
    const {
      id,
      nickname,
      email,
      phone,
      rank,
      point,
      provider,
      role,
      uniqueId,
      createdAt,
      updatedAt,
      deletedAt
    } = props;

    const now = new Date();

    this._id = id || undefined;
    this._nickname = nickname;
    this._email = email;
    this._phone = phone;
    this._rank = rank;
    this._point = point;
    this._provider = provider;
    this._role = role;
    this._uniqueId = uniqueId;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this._deletedAt = deletedAt || null;
  }
}
