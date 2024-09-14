import { FancySubOptionDto } from '@src/api/fancy-sub-options/dtos/fancy-sub-option.dto';
import { SubOptionDto } from '@src/api/sub-options/dtos/sub-option.dto';

export class FancySubOptionWithSubOptionDto extends FancySubOptionDto {
  subOption: SubOptionDto;
}
