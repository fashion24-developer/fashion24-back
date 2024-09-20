import { FindAllFancyDto } from '@src/api/apps/fancy/dtos/find-all-fancy.dto';
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
      fancyImages: data.fancyImages,
      fancyOptions: data.fancyOptions,
      fancySubOptions: data.fancySubOptions,
      looks: data.looks,
      tags: data.tags
    });
  }

  static paginationWhere(
    data: Omit<FindAllFancyDto, 'page' | 'pageSize' | 'orderBy' | 'orderDirection'>
  ) {
    const { name, status, optionId, subOptionId, lookId, tagId } = data;

    return {
      name: { contains: name },
      status,
      AND: [
        ...(optionId
          ? optionId.map((id) => ({
              fancyOptions: {
                some: {
                  option: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(subOptionId
          ? subOptionId.map((id) => ({
              fancySubOptions: {
                some: {
                  subOption: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(lookId ? lookId.map((id) => ({ looks: { some: { id } } })) : []),
        ...(tagId ? tagId.map((id) => ({ tags: { some: { id } } })) : [])
      ]
    };
  }
}
