import { ValueOf } from '@src/common/types/common.type';

export enum SortOption {
  ASC = 'asc',
  DESC = 'desc'
}

export type SortOptionType = ValueOf<typeof SortOption>;
