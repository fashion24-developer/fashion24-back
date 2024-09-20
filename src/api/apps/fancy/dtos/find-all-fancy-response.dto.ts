import { Exclude } from 'class-transformer';

import { FancyDto } from '@src/libs/fancy/dtos/fancy.dto';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

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
