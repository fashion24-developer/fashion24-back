import { ValueOf } from '@src/common/types/common.type';

export enum FancyOrderBy {
  COST_PRICE = 'costPrice',
  PRICE = 'price',
  DISCOUNT_RATE = 'discountRate',
  CREATED_AT = 'createdAt'
}

export type FancyOrderByType = ValueOf<typeof FancyOrderBy>;
