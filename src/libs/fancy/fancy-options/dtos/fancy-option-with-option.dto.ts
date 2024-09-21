import { FancyOptionDto } from '@src/libs/fancy/fancy-options/dtos/fancy-option.dto';
import { OptionDto } from '@src/libs/options/dtos/option.dto';

export class FancyOptionWithOptionDto extends FancyOptionDto {
  option: OptionDto;
}
