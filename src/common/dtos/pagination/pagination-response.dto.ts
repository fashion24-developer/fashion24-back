import { IPaginationMeta } from '@src/common/interfaces/pagination/i-pagination-meta.interface';

export class PaginationResponseDto<T> {
  data: Array<T>;

  meta: IPaginationMeta;

  constructor(data: Array<T>, meta: IPaginationMeta) {
    this.data = data;
    this.meta = meta;
  }
}
