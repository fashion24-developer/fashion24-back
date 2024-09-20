import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class LookEntity {
  /**
   * Primary Key
   */
  private _id: number;
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
  private _createdAt: Date;

  private _fancies: FancyEntity[];
}
