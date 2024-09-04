import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common';

export class ExistsPipe implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (!value) {
      throw new HttpException(
        `The ${metadata.data} is required for ${metadata.type}.`,
        HttpStatus.BAD_REQUEST
      );
    }

    return value;
  }
}
