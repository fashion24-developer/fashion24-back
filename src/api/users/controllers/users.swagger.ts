import { applyDecorators } from '@nestjs/common';
import {
  ApiMethodNotAllowedResponse,
  ApiOperation,
  ApiOperationOptions,
} from '@nestjs/swagger';

import { UsersController } from '@src/api/users/controllers/users.controller';
import { ApiOperator } from '@src/common/types/common.type';

export const ApiUsers: ApiOperator<keyof UsersController> = {
  Create(
    apiOperationOptions: Required<Pick<ApiOperationOptions, 'summary'>> &
      ApiOperationOptions,
  ): PropertyDecorator {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  FindAll(
    apiOperationOptions: Required<Pick<ApiOperationOptions, 'summary'>> &
      ApiOperationOptions,
  ) {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  FindOne(
    apiOperationOptions: Required<Pick<ApiOperationOptions, 'summary'>> &
      ApiOperationOptions,
  ) {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  Update(
    apiOperationOptions: Required<Pick<ApiOperationOptions, 'summary'>> &
      ApiOperationOptions,
  ) {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  Remove(
    apiOperationOptions: Required<Pick<ApiOperationOptions, 'summary'>> &
      ApiOperationOptions,
  ) {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },
};
