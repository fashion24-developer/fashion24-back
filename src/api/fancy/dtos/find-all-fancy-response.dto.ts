import { Exclude } from 'class-transformer';

import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { FancyEntity } from '@src/api/fancy/entity/fancy.entity';

export class FindAllFancyResponseDto extends FancyDto {
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(props: FancyEntity) {
    super();
    Object.assign(this, props.getPropsWithForeign());
  }
}
