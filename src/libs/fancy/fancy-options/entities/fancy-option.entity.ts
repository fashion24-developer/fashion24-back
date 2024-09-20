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
  private _createdAt: Date;

  private fancy: FancyEntity;

  private option: OptionEntity;
}
