import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UsersController } from '@src/api/users/controllers/users.controller';
import {
  COMMON_ERROR_HTTP_STATUS_CODE,
  COMMON_ERROR_HTTP_STATUS_MESSAGE
} from '@src/common/constants/common.constant';
import { ErrorSwaggerBuilder } from '@src/common/decorators/error-swagger-builder.decorator';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

export const ApiUsers: ApiOperator<keyof UsersController> = {
  Create: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ErrorSwaggerBuilder(
        COMMON_ERROR_HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[405],
        [
          {
            description: '허용되지 않은 HTTP 메서드를 사용했을 때.',
            message: 'Method not allowed'
          },
          {
            description: '허용되지 않은 HTTP 메서드를 어쩌구.',
            message: 'Method not 어쩌구'
          },
          { description: '허용되지 않은 HTTP 메서.', message: ['Method', 'not', 'allowed'] },
          {
            description: '허용 어쩌구 HTTP 어쩌구',
            message: ['Method', 'not', 'allowed', '어쩌구', '저쩌구']
          }
        ],
        UsersController.path
      )
    );
  },

  FindAll: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ErrorSwaggerBuilder(
        COMMON_ERROR_HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[405],
        [
          { description: '허용되지 않은 HTTP 메서드를 사용했을 때.', message: 'Method not allowed' }
        ],
        UsersController.path
      )
    );
  },

  FindOne: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ErrorSwaggerBuilder(
        COMMON_ERROR_HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[405],
        [
          { description: '허용되지 않은 HTTP 메서드를 사용했을 때.', message: 'Method not allowed' }
        ],
        `${UsersController.path}/1`
      )
    );
  },

  Update: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ErrorSwaggerBuilder(
        COMMON_ERROR_HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[405],
        [
          { description: '허용되지 않은 HTTP 메서드를 사용했을 때.', message: 'Method not allowed' }
        ],
        `${UsersController.path}/1`
      )
    );
  },

  Remove: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ErrorSwaggerBuilder(
        COMMON_ERROR_HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[405],
        [
          { description: '허용되지 않은 HTTP 메서드를 사용했을 때.', message: 'Method not allowed' }
        ],
        `${UsersController.path}/1`
      )
    );
  }
};
