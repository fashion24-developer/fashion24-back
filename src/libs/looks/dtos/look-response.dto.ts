import { LookDto } from '@src/libs/looks/dtos/look.dto';
import { LookEntity } from '@src/libs/looks/entities/look.entity';

export class LookResponseDto extends LookDto {
  constructor(props: LookEntity) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.imageUrl = props.imageUrl;
    this.createdAt = props.createdAt;
  }
}
