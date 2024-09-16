import { FancyImageDto } from '@src/api/fancy-images/dtos/fancy-image.dto';
import { FancyOptionWithOptionDto } from '@src/api/fancy-options/dtos/fancy-option-with-Option.dto';
import { FancySubOptionWithSubOptionDto } from '@src/api/fancy-sub-options/dtos/fancy-sub-option-with-sub-option.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { LookDto } from '@src/api/looks/dtos/look.dto';
import { TagDto } from '@src/api/tags/dtos/tag.dto';

export class FindAllFancyResponseDto extends FancyDto {
  fancyImages: FancyImageDto[];
  fancyOptions: FancyOptionWithOptionDto[];
  fancySubOptions: FancySubOptionWithSubOptionDto[];
  looks: LookDto[];
  tags: TagDto[];
}
