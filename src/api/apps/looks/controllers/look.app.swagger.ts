import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath
} from '@nestjs/swagger';

import { LookAppController } from '@src/api/apps/looks/controllers/look.app.controller';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';
import { LookResponseDto } from '@src/libs/looks/dtos/look-response.dto';

export const ApiLookApp: ApiOperator<keyof LookAppController> = {
  FindAll: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiExtraModels(LookResponseDto),
      ApiResponse({
        status: 200,
        description: '룩 전체 조회 성공.',
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath(LookResponseDto) },
          example: [
            {
              id: 1,
              name: '1번룩',
              imageUrl: 'asd',
              createdAt: '2024-09-11T20:14:50.075Z'
            },
            {
              id: 2,
              name: '2번룩',
              imageUrl: 'asd',
              createdAt: '2024-09-11T20:14:50.077Z'
            },
            {
              id: 3,
              name: '3번룩',
              imageUrl: 'asd',
              createdAt: '2024-09-11T20:14:50.078Z'
            },
            {
              id: 4,
              name: '4번룩',
              imageUrl: 'asd',
              createdAt: '2024-09-11T20:14:50.079Z'
            },
            {
              id: 5,
              name: '5번룩',
              imageUrl: 'asd',
              createdAt: '2024-09-11T20:14:50.080Z'
            }
          ]
        }
      }),

      ApiResponse({
        status: 500,
        description: 'Look 조회 실패',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 500
            },
            timestamp: {
              type: 'string',
              example: '2024-09-06T05:02:18.503Z'
            },
            path: {
              type: 'string',
              example: '/api/v1/look'
            },
            message: {
              type: 'string',
              example: 'Failed to find look'
            }
          }
        }
      }),

      ApiCookieAuth('accessToken')
    );
  }
};
