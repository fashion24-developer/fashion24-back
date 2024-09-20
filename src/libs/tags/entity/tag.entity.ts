import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class TagEntity {
  /**
   * Primary Key
   */
  private readonly _id?: number;
  /**
   * 태그 이름
   */
  private _name: string;
  /**
   * 생성일
   */
  private readonly _createdAt?: Date;

  private _fancies?: FancyEntity[];

  private _whatever?: any[];

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }
}
