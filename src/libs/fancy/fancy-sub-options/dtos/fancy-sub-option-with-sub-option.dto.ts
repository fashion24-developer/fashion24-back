import { FancySubOptionDto } from '@src/libs/fancy/fancy-sub-options/dtos/fancy-sub-option.dto';
import { SubOptionDto } from '@src/libs/sub-options/dtos/sub-option.dto';

export class FancySubOptionWithSubOptionDto extends FancySubOptionDto {
  subOption: SubOptionDto;
}
