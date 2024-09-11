import { ApiOperationOptions } from '@nestjs/swagger';

export type ApiOperationOptionsWithSummary = Required<Pick<ApiOperationOptions, 'summary'>> &
  ApiOperationOptions;

export type ApiOperator<M extends string> = {
  [key in Capitalize<M>]: (
    apiOperationOptions: ApiOperationOptionsWithSummary
  ) => PropertyDecorator;
};

export type ValueOf<T extends Record<string, any>> = T[keyof T];
