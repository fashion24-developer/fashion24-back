import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { ValueOf } from '@src/common/types/common.type';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class CreateFancyResponseDto {
  id: string;

  name: string;

  costPrice: number;

  price: number;

  discountRate: number;

  description1?: string;

  description2?: string;

  status: ValueOf<typeof FancyProductStatus>;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: FancyEntity) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.discountRate = data.discountRate;
    this.price = data.price;
    this.discountRate = data.discountRate;
    this.description1 = data.description1;
    this.description2 = data.description2;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
