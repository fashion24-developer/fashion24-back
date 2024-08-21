import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';

import { REWRITE_VALIDATION_OPTIONS_TOKEN } from '@src/pipes/constants/rewrite-validation-options.token';

export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    const options = Reflect.getMetadata(REWRITE_VALIDATION_OPTIONS_TOKEN, metadata.metatype);

    let originOptions: Record<string, any> = {};

    if (options) {
      originOptions = { ...this.validatorOptions };
      this.validatorOptions = Object.assign(this.validatorOptions, options);
    }

    const result = await super.transform(value, metadata);

    if (originOptions) {
      this.validatorOptions = originOptions;
    }

    return result;
  }
}
