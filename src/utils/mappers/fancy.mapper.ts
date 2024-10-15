import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class FancyMapper {
  static toEntity(data: any): FancyEntity {
    return new FancyEntity({
      id: data.id,
      name: data.name,
      price: data.price,
      costPrice: data.costPrice,
      discountRate: data.discountRate,
      description1: data.description1,
      description2: data.description2,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      fancyImages: data.fancyImages
    });
  }
}
