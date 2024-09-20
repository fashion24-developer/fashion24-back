import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { ValueOf } from '@src/common/types/common.type';
import { FancyImageEntity } from '@src/libs/fancy/fancy-images/entity/fancy-image.entity';
import { FancyOptionEntity } from '@src/libs/fancy/fancy-options/entity/fancy-option.entity';
import { FancySubOptionEntity } from '@src/libs/fancy/fancy-sub-options/entity/fancy-sub-option.entity';
import { LookEntity } from '@src/libs/looks/entity/look.entity';
import { TagEntity } from '@src/libs/tags/entity/tag.entity';

export class FancyEntity {
  /**
   * Primary Key
   */
  private readonly _id?: string;
  /**
   * 상품명
   */
  private _name: string;
  /**
   * 원가
   */
  private _price: number;
  /**
   * 판매가
   */
  private _costPrice: number;
  /**
   * 할인율
   */
  private _discountRate?: number;
  /**
   * 설명1
   */
  private _description1?: string;
  /**
   * 설명2
   */
  private _description2?: string;
  /**
   * 상태
   */
  private _status: ValueOf<typeof FancyProductStatus>;
  /**
   * 생성일
   */
  private readonly _createdAt?: Date;
  /**
   * 수정일
   */
  private readonly _updatedAt?: Date;

  private _fancyImages?: FancyImageEntity[];

  private _fancyStocks?: any[];

  private _fancyOptions?: FancyOptionEntity[];

  private _fancySubOptions?: FancySubOptionEntity[];

  private _looks?: LookEntity[];

  private _tags?: TagEntity[];

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get costPrice(): number {
    return this._costPrice;
  }

  get discountRate(): number {
    return this._discountRate;
  }

  get description1(): string | undefined {
    return this._description1;
  }

  get description2(): string | undefined {
    return this._description2;
  }

  get status(): ValueOf<typeof FancyProductStatus> {
    return this._status;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get fancyImages(): FancyImageEntity[] | undefined {
    return this._fancyImages;
  }

  get fancyStocks(): any[] | undefined {
    return this._fancyStocks;
  }

  get fancyOptions(): FancyOptionEntity[] | undefined {
    return this._fancyOptions;
  }

  get fancySubOptions(): FancySubOptionEntity[] | undefined {
    return this._fancySubOptions;
  }

  get looks(): LookEntity[] | undefined {
    return this._looks;
  }

  get tags(): TagEntity[] | undefined {
    return this._tags;
  }

  getProps(): {
    id: string;
    name: string;
    price: number;
    costPrice: number;
    discountRate: number;
    description1?: string;
    description2?: string;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      costPrice: this._costPrice,
      discountRate: this._discountRate,
      description1: this._description1,
      description2: this._description2,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  getPropsWithForeign(): {
    id: string;
    name: string;
    price: number;
    costPrice: number;
    discountRate: number;
    description1?: string;
    description2?: string;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt: Date;
    updatedAt: Date;
    fancyImages?: FancyImageEntity[];
    fancyOptions?: FancyOptionEntity[];
    fancySubOptions?: FancySubOptionEntity[];
    looks?: LookEntity[];
    tags?: TagEntity[];
  } {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      costPrice: this._costPrice,
      discountRate: this._discountRate,
      description1: this._description1,
      description2: this._description2,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      fancyImages: this._fancyImages,
      fancyOptions: this._fancyOptions,
      fancySubOptions: this._fancySubOptions,
      looks: this._looks,
      tags: this._tags
    };
  }

  constructor(props: {
    id: string;
    name: string;
    price: number;
    costPrice: number;
    discountRate: number;
    description1?: string;
    description2?: string;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt?: Date;
    updatedAt?: Date;
    fancyImages?: FancyImageEntity[];
    fancyOptions?: FancyOptionEntity[];
    fancySubOptions?: FancySubOptionEntity[];
    looks?: LookEntity[];
    tags?: TagEntity[];
  }) {
    const {
      id,
      name,
      price,
      costPrice,
      discountRate,
      description1,
      description2,
      status,
      createdAt,
      updatedAt,
      fancyImages,
      fancyOptions,
      fancySubOptions,
      looks,
      tags
    } = props;

    const now = new Date();

    this._id = id;
    this._name = name;
    this._price = price;
    this._costPrice = costPrice;
    this._discountRate = discountRate;
    this._description1 = description1;
    this._description2 = description2;
    this._status = status;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this._fancyImages = fancyImages;
    this._fancyOptions = fancyOptions;
    this._fancySubOptions = fancySubOptions;
    this._looks = looks;
    this._tags = tags;
  }
}
