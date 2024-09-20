import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FancyAppController } from '@src/api/apps/fancy/controllers/fancy.app.controller';
import {
  COMMON_ERROR_HTTP_STATUS_CODE,
  COMMON_ERROR_HTTP_STATUS_MESSAGE
} from '@src/common/constants/common.constant';
import { SwaggerErrorResponse } from '@src/common/decorators/swagger-error-response.decorator';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

// 해당 문서 편집 반드시 필요함. Schema 관련 문서화가 제대로 안되어 있음
export const ApiFancyApp: ApiOperator<keyof FancyAppController> = {
  FindAllForPagination: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),

      ApiResponse({
        status: 200,
        description: 'Fancy 조회 성공.',
        schema: {
          example: {
            data: [
              {
                id: 'NHTXBZjqFujs4omUc9cGg',
                name: 'finger ring',
                price: 24250,
                costPrice: 25000,
                discountRate: 3,
                status: 'ACTIVE',
                fancyImages: [],
                fancyOptions: [],
                fancySubOptions: [],
                looks: [],
                tags: []
              },
              {
                id: 'g',
                name: '방빙',
                price: 5000,
                costPrice: 10000,
                discountRate: 50,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 7,
                    imageUrl: 'asd'
                  }
                ],
                fancyOptions: [],
                fancySubOptions: [],
                looks: [],
                tags: []
              },
              {
                id: 'd',
                name: '담봉',
                price: 4000,
                costPrice: 10000,
                discountRate: 60,
                status: 'ACTIVE',
                fancyImages: [],
                fancyOptions: [
                  {
                    option: {
                      id: 1,
                      name: '모양'
                    }
                  }
                ],
                fancySubOptions: [
                  {
                    subOption: {
                      id: 2,
                      name: '세모',
                      additionalPrice: 2000
                    }
                  },
                  {
                    subOption: {
                      id: 1,
                      name: '네모',
                      additionalPrice: 1000
                    }
                  }
                ],
                looks: [
                  {
                    id: 1,
                    name: '1번룩',
                    imageUrl: 'asd'
                  },
                  {
                    id: 2,
                    name: '2번룩',
                    imageUrl: 'asd'
                  },
                  {
                    id: 5,
                    name: '5번룩',
                    imageUrl: 'asd'
                  }
                ],
                tags: [
                  {
                    id: 3,
                    name: '3번태그'
                  }
                ]
              }
            ],
            meta: {
              pageNumber: 1,
              pageSize: 3,
              totalPages: 4,
              totalCount: 10,
              isLastPage: false,
              isFirstPage: true
            }
          }
        }
      }),

      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[400],
        [
          {
            message: ['page must be a positive number', 'page must be an integer number'],
            description: 'page가 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?page=a&pageSize=5`
          },
          {
            message: [
              'pageSize must not be greater than 100',
              'pageSize must not be less than 1',
              'pageSize must be an integer number'
            ],
            description: 'PageSize 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?page=1&pageSize=a`
          },
          {
            message: ['name must be shorter than or equal to 50 characters'],
            description: 'name 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?name=asdfasdfasdfasdfasdfasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa`
          },
          {
            message: ['status must be one of the following values: ACTIVE, INACTIVE'],
            description: 'status 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?status=asd`
          },
          {
            message: [
              'optionId must contain no more than 5 elements',
              'each value in optionId must be an integer number'
            ],
            description: 'optionId 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?optionId=a&optionId=a&optionId=a&optionId=a&optionId=a&optionId=a`
          },
          {
            message: [
              'subOptionId must contain no more than 5 elements',
              'each value in subOptionId must be an integer number'
            ],
            description: 'subOptionId 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?subOptionId=a&subOptionId=a&subOptionId=a&subOptionId=a&subOptionId=a&subOptionId=a`
          },
          {
            message: [
              'lookId must contain no more than 5 elements',
              'each value in lookId must be an integer number'
            ],
            description: 'lookId 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?lookId=a&lookId=a&lookId=a&lookId=a&lookId=a&lookId=a`
          },
          {
            message: [
              'tagId must contain no more than 5 elements',
              'each value in tagId must be an integer number'
            ],
            description: 'tagId 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?tagId=a&tagId=a&tagId=a&tagId=a&tagId=a&tagId=a`
          },
          {
            message: [
              'orderBy must be one of the following values: costPrice, price, discountRate, createdAt'
            ],
            description: 'orderBy 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?orderBy=asdasda`
          },
          {
            message: 'orderDirection must be one of the following values: asc, desc',
            description: 'orderDirection 조건에 해당하지 않는 경우',
            path: `${FancyAppController.path}?orderDirection=asdasda`
          }
        ]
      ),

      ApiResponse({
        status: 500,
        description: 'Fancy 조회 실패',
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
              example: `${FancyAppController.path}`
            },
            message: {
              type: 'string',
              example: 'Failed to find fancy'
            }
          }
        }
      }),

      ApiCookieAuth('accessToken')
    );
  }
};
