import { FancyOptionDto } from '@src/api/fancy-options/dtos/fancy-option.dto';
import { OptionDto } from '@src/api/options/dtos/option.dto';

export class FancyOptionWithOptionDto extends FancyOptionDto {
  option: OptionDto;
}
