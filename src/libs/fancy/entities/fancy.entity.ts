import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { ValueOf } from '@src/common/types/common.type';
import { FancyImageEntity } from '@src/libs/fancy/fancy-images/entities/fancy-image.entity';
import { LookEntity } from '@src/libs/looks/entities/look.entity';
import { TagEntity } from '@src/libs/tags/entities/tag.entity';

export class FancyEntity {
  /**
   * Primary Key
   */
  private readonly _id?: string;
  /**
   * 룩 ID
   */
  private _fancyLookId?: number | never;
  /**
   * 상품 타입 ID
   */
  private _fancyTypeId?: number | never;
  /**
   * 상품명
   */
  private _name: string;
  /**
   * 원가
   */
  private _costPrice: number;
  /**
   * 판매가
   */
  private _price: number;
  /**
   * 할인율
   */
  private _discountRate: number;
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

  private _fancyTags?: TagEntity[];

  private _fancyOrderItems?: any[];

  private _fancyReviews?: any[];

  private _fancyPlatingColors?: any[];

  private _fancyLook?: LookEntity;

  private _fancyType?: any;

  get id(): string | undefined {
    return this._id;
  }

  get fancyLookId(): number | undefined {
    return this._fancyLookId;
  }

  get fancyTypeId(): number | undefined {
    return this._fancyTypeId;
  }

  get name(): string {
    return this._name;
  }

  get costPrice(): number {
    return this._costPrice;
  }

  get price(): number {
    return this._price;
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

  get fancyTags() {
    return this._fancyTags;
  }

  get fancyOrderItems() {
    return this._fancyOrderItems;
  }

  get fancyPlatingColors() {
    return this._fancyPlatingColors;
  }

  get fancyLook() {
    return this._fancyLook;
  }

  get fancyType() {
    return this._fancyType;
  }

  getProps(): {
    id: string;
    fancyLookId: number | null;
    fancyTypeId: number | null;
    name: string;
    costPrice: number;
    price: number;
    discountRate: number;
    description1: string | null;
    description2: string | null;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      fancyLookId: this._fancyLookId,
      fancyTypeId: this._fancyTypeId,
      name: this._name,
      costPrice: this._costPrice,
      price: this._price,
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
    fancyLookId: number | null;
    fancyTypeId: number | null;
    name: string;
    costPrice: number;
    price: number;
    discountRate: number;
    description1: string | null;
    description2: string | null;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt: Date;
    updatedAt: Date;
    fancyImages?: FancyImageEntity[];
    fancyStocks?: any[];
    fancyTags?: TagEntity[];
    fancyOrderItems?: any[];
    fancyReviews?: any[];
    fancyPlatingColors?: any[];
    fancyLook?: LookEntity;
    fancyType?: any;
  } {
    return {
      id: this._id,
      fancyLookId: this._fancyLookId,
      fancyTypeId: this._fancyTypeId,
      name: this._name,
      costPrice: this._costPrice,
      price: this._price,
      discountRate: this._discountRate,
      description1: this._description1,
      description2: this._description2,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      fancyImages: this._fancyImages,
      fancyStocks: this._fancyStocks,
      fancyTags: this._fancyTags,
      fancyOrderItems: this._fancyOrderItems,
      fancyReviews: this._fancyReviews,
      fancyPlatingColors: this._fancyPlatingColors,
      fancyLook: this._fancyLook,
      fancyType: this._fancyType
    };
  }

  constructor(props: {
    id: string;
    fancyLookId?: number;
    fancyTypeId?: number;
    name: string;
    costPrice: number;
    price: number;
    discountRate: number;
    description1?: string;
    description2?: string;
    status: ValueOf<typeof FancyProductStatus>;
    createdAt?: Date;
    updatedAt?: Date;
    fancyImages?: FancyImageEntity[];
    fancyStocks?: any[];
    fancyTags?: TagEntity[];
    fancyOrderItems?: any[];
    fancyReviews?: any[];
    fancyPlatingColors?: any[];
    fancyLook?: LookEntity;
    fancyType?: TagEntity;
  }) {
    const {
      id,
      fancyLookId,
      fancyTypeId,
      name,
      costPrice,
      price,
      discountRate,
      description1,
      description2,
      status,
      createdAt,
      updatedAt,
      fancyImages,
      fancyStocks,
      fancyTags,
      fancyOrderItems,
      fancyReviews,
      fancyPlatingColors,
      fancyLook,
      fancyType
    } = props;

    const now = new Date();

    this._id = id;
    this._fancyLookId = fancyLookId;
    this._fancyTypeId = fancyTypeId;
    this._name = name;
    this._costPrice = costPrice;
    this._price = price;
    this._discountRate = discountRate;
    this._description1 = description1;
    this._description2 = description2;
    this._status = status;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this._fancyImages = fancyImages;
    this._fancyStocks = fancyStocks;
    this._fancyTags = fancyTags;
    this._fancyOrderItems = fancyOrderItems;
    this._fancyReviews = fancyReviews;
    this._fancyPlatingColors = fancyPlatingColors;
    this._fancyLook = fancyLook;
    this._fancyType = fancyType;
  }
}
