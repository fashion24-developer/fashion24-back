import { Prisma } from '@prisma/client';

import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';

export class FancyMapper {
  static findAllWhere(
    data: Omit<FindAllFancyDto, 'page' | 'pageSize' | 'orderBy' | 'orderDirection'>
  ): Prisma.FancyWhereInput {
    const { name, status, optionName, subOptionName, lookName, tagName } = data;

    return {
      name: { contains: name },
      status,
      AND: [
        ...(optionName
          ? optionName.map((id) => ({
              fancyOptions: {
                some: {
                  option: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(subOptionName
          ? subOptionName.map((id) => ({
              fancySubOptions: {
                some: {
                  subOption: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(lookName ? lookName.map((id) => ({ looks: { some: { id } } })) : []),
        ...(tagName ? tagName.map((id) => ({ tags: { some: { id } } })) : [])
      ]
    };
  }
}
