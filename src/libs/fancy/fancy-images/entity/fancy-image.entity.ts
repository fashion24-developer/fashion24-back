import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class FancyImageEntity {
  /**
   * Primary Key
   */
  private readonly _id: number;
  /**
   * 완제품 아이디 (FK)
   */
  private _fancyId: string;
  /**
   * 이미지
   */
  private _imageUrl: string;
  /**
   * 순서
   */
  private _order: number;
  /**
   * 생성일
   */
  private _createdAt: Date;

  private _fancy: FancyEntity;

  get id(): number {
    return this._id;
  }

  get fancyId(): string {
    return this._fancyId;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get order(): number {
    return this._order;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  constructor(props: {
    id: number;
    fancyId: string;
    imageUrl: string;
    order: number;
    createdAt: Date;
  }) {
    this._id = props.id;
    this._fancyId = props.fancyId;
    this._imageUrl = props.imageUrl;
    this._order = props.order;
    this._createdAt = props.createdAt;
  }
}
