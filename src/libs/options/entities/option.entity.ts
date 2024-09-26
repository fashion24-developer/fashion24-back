import { FancyOptionEntity } from '@src/libs/fancy/fancy-options/entities/fancy-option.entity';
import { SubOptionEntity } from '@src/libs/sub-options/entities/sub-option.entity';

export class OptionEntity {
  /**
   * Primary Key
   */
  private readonly _id: number;
  /**
   * 옵션 이름
   */
  private _name: string;
  /**
   * 생성일
   */
  private readonly _createdAt: Date;

  private _fancyOptions: FancyOptionEntity[];

  private _subOptions: SubOptionEntity[];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
