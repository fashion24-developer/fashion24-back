import { FancySubOptionEntity } from '@src/libs/fancy/fancy-sub-options/entity/fancy-sub-option.entity';
import { OptionEntity } from '@src/libs/options/entity/option.entity';

export class SubOptionEntity {
  /**
   * Primary Key
   */
  private readonly _id: number;
  /**
   * 옵션 아이디 (FK)
   */
  private _optionId: number;
  /**
   * 소옵션 이름
   */
  private _name: string;
  /**
   * 소옵션 추가 금액
   */
  private _additionalPrice: number;
  /**
   * 생성일
   */
  private _createdAt: Date;

  private _fancySubOptions: FancySubOptionEntity[];
  private _option: OptionEntity;
}
