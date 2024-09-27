import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';
import { OptionEntity } from '@src/libs/options/entities/option.entity';

export class FancyOptionEntity {
  /**
   * Primary Key
   */
  private readonly _id: number;
  /**
   * 완제품 아이디 (FK)
   */
  private _fancyId: number;
  /**
   * 옵션 아이디 (FK)
   */
  private _optionId: number;
  /**
   * 생성일
   */
  private readonly _createdAt: Date;

  private _fancy: FancyEntity;

  private _option: OptionEntity;

  get id() {
    return this._id;
  }

  get fancyId() {
    return this._fancyId;
  }

  get optionId() {
    return this._optionId;
  }

  get createdAt() {
    return this._createdAt;
  }

  get option() {
    return this._option;
  }

  get fancy() {
    return this._fancy;
  }
}
