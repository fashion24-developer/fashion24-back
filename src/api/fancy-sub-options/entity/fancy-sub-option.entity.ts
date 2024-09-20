import { FancyEntity } from '@src/api/fancy/entity/fancy.entity';
import { SubOptionEntity } from '@src/api/sub-options/entity/sub-option.entity';

export class FancySubOptionEntity {
  /**
   * Primary Key
   */
  private readonly _id?: number;
  /**
   * 완제품 아이디 (FK)
   */
  private _fancyId: string;
  /**
   * 소옵션 아이디 (FK)
   */
  private _subOptionId: number;
  /**
   * 생성일
   */
  private readonly _createdAt?: Date;

  fancy: FancyEntity;
  subOption: SubOptionEntity;

  constructor(props: { id: number; fancyId: string; subOptionId: number; createdAt: Date }) {
    this._id = props.id;
    this._fancyId = props.fancyId;
    this._subOptionId = props.subOptionId;
    this._createdAt = props.createdAt;
  }
}
