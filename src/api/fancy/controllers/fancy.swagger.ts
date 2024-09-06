import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { getSchemaPath } from '@nestjs/swagger';

import { FancyController } from '@src/api/fancy/controllers/fancy.controller';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

export const ApiFancy: ApiOperator<keyof FancyController> = {
  Create: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiResponse({
        status: 201,
        description: 'Fancy 생성 성공.',
        type: FancyDto,
        schema: {
          example: {
            id: '90c7gRlwkLvmDQxbp5pzY',
            name: 'finger ring',
            costPrice: 25000,
            price: 24250,
            discountRate: 3,
            description1: '예쁘고 미니멀한 반지',
            description2: '이 반지는 예쁘고 미니멀한 반자입니다.',
            status: 'ACTIVE',
            createdAt: '2024-09-05T12:15:54.194Z',
            updatedAt: '2024-09-05T12:15:54.194Z'
          },
          $ref: getSchemaPath(FancyDto)
        }
      }),
      ApiResponse({
        status: 400,
        description: '필수 요청 값이 누락되었거나 잘못된 형식일 경우',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 400
            },
            timestamp: {
              type: 'string',
              example: '2024-09-06T05:02:18.503Z'
            },
            path: {
              type: 'string',
              example: '/api/fancy'
            },
            message: {
              type: 'object',
              properties: {
                message: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: [
                    'property status1 should not exist',
                    'status must be one of the following values: ACTIVE, INACTIVE'
                  ]
                }
              }
            },
            error: {
              type: 'string',
              example: 'Bad Request'
            }
          }
        }
      }),
      ApiResponse({
        status: 500,
        description: 'Fancy 생성 실패',
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
              example: '/api/fancy'
            },
            message: {
              type: 'string',
              example: 'Failed to create fancy'
            }
          }
        }
      })
    );
  }
};
