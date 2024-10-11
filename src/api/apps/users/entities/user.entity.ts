import { UserGender } from '@src/api/apps/users/enums/user-gender.enum';
import { UserProvider } from '@src/api/apps/users/enums/user-provider.enum';
import { UserRole } from '@src/api/apps/users/enums/user-role.enum';
import { ValueOf } from '@src/common/types/common.type';

interface UserCreateProps {
  name: string;
  nickname?: string | null;
  email: string;
  phone?: string | null;
  provider: ValueOf<typeof UserProvider>;
  uniqueId: string;
  address?: string | null;
  gender: ValueOf<typeof UserGender>;
  birth?: Date | null;
}

export class UserEntity {
  private readonly _id?: number;
  private _name: string;
  private _nickname: string | null;
  private _email: string;
  private _phone: string | null;
  private _rank: number;
  private _point: number;
  private _provider: ValueOf<typeof UserProvider>;
  private _role: ValueOf<typeof UserRole>;
  private readonly _uniqueId: string;
  private _address: string | null;
  private _gender: ValueOf<typeof UserGender>;
  private _birth: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get nickname(): string | null {
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

  get address(): string | null {
    return this._address;
  }

  get gender(): ValueOf<typeof UserGender> {
    return this._gender;
  }

  get birth(): Date | null {
    return this._birth;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  getProps(): {
    id: number;
    name: string;
    nickname: string | null;
    email: string;
    phone: string | null;
    rank: number;
    provider: ValueOf<typeof UserProvider>;
    role: ValueOf<typeof UserRole>;
    uniqueId: string;
    point: number;
    address: string | null;
    gender: ValueOf<typeof UserGender>;
    birth: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      name: this._name,
      nickname: this._nickname,
      email: this._email,
      phone: this._phone,
      rank: this._rank,
      provider: this._provider,
      role: this._role,
      uniqueId: this._uniqueId,
      point: this._point,
      address: this._address,
      gender: this._gender,
      birth: this._birth,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  update(
    props: Partial<
      Pick<
        UserEntity,
        | 'rank'
        | 'email'
        | 'nickname'
        | 'phone'
        | 'point'
        | 'role'
        | 'address'
        | 'gender'
        | 'birth'
        | 'name'
      >
    >
  ) {
    const { rank, point, role, email, nickname, phone, name, address, gender, birth } = props;

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

    if (name) {
      this._name = name;
      this._updatedAt = now;
    }

    if (address) {
      this._address = address;
      this._updatedAt = now;
    }

    if (gender) {
      this._gender = gender;
      this._updatedAt = now;
    }

    if (birth) {
      this._birth = birth;
      this._updatedAt = now;
    }
  }

  static create(createProps: UserCreateProps): UserEntity {
    return new UserEntity({
      name: createProps.name,
      nickname: createProps.nickname || null,
      email: createProps.email,
      phone: createProps.phone || null,
      rank: 1,
      point: 0,
      provider: createProps.provider,
      role: UserRole.USER,
      uniqueId: createProps.uniqueId,
      address: createProps.address || null,
      gender: createProps.gender,
      birth: createProps.birth || null
    });
  }

  constructor(props: {
    id?: number;
    name: string;
    nickname: string | null;
    email: string;
    phone: string | null;
    rank: number;
    point: number;
    provider: ValueOf<typeof UserProvider>;
    role: ValueOf<typeof UserRole>;
    uniqueId: string;
    address: string | null;
    gender: ValueOf<typeof UserGender>;
    birth: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    const {
      id,
      name,
      nickname,
      email,
      phone,
      rank,
      point,
      provider,
      role,
      uniqueId,
      createdAt,
      updatedAt
    } = props;

    const now = new Date();

    this._id = id || undefined;
    this._name = name;
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
  }
}
