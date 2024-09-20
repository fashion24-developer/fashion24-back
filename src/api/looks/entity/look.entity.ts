import { FancyEntity } from '@src/api/fancy/entity/fancy.entity';

export class LookEntity {
  /**
   * Primary Key
   */
  private readonly _id: number;
  /**
   * 룩 이름
   */
  private _name: string;
  /**
   * 이미지
   */
  private _imageUrl: string;
  /**
   * 생성일
   */
  private readonly _createdAt: Date;

  private _fancies: FancyEntity[];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  constructor(props: { id: number; name: string; imageUrl: string; createdAt: Date }) {
    const now = new Date();

    this._id = props.id;
    this._name = props.name;
    this._imageUrl = props.imageUrl;
    this._createdAt = props.createdAt || now;
  }
}
