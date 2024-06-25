import { applyDecorators } from '@nestjs/common';
import { ApiMethodNotAllowedResponse, ApiOperation } from '@nestjs/swagger';

import { UsersController } from '@src/api/users/controllers/users.controller';
import {
  ApiOperationOptionsWithSummary,
  ApiOperator,
} from '@src/common/types/common.type';

export const ApiUsers: ApiOperator<keyof UsersController> = {
  Create: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  FindAll: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  FindOne: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  Update: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },

  Remove: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiMethodNotAllowedResponse(),
    );
  },
};
