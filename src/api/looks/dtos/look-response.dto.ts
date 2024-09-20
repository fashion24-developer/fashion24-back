import { LookDto } from '@src/api/looks/dtos/look.dto';
import { LookEntity } from '@src/api/looks/entity/look.entity';

export class LookResponseDto extends LookDto {
  constructor(props: LookEntity) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.imageUrl = props.imageUrl;
    this.createdAt = props.createdAt;
  }
}
