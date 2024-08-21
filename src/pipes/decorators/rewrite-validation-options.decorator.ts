import { SetMetadata } from '@nestjs/common';

import { ValidatorOptions } from 'class-validator';

import { REWRITE_VALIDATION_OPTIONS_TOKEN } from '@src/pipes/constants/rewrite-validation-options.token';

export const RewriteValidationOptions = (validatorOptions: ValidatorOptions) => {
  return SetMetadata(REWRITE_VALIDATION_OPTIONS_TOKEN, validatorOptions);
};
