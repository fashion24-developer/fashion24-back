import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FancyAppController } from '@src/api/apps/fancy/controllers/fancy.app.controller';
import { FindAllFancyResponseDto } from '@src/api/apps/fancy/dtos/find-all-fancy-response.dto';
import {
  COMMON_ERROR_HTTP_STATUS_CODE,
  COMMON_ERROR_HTTP_STATUS_MESSAGE
} from '@src/common/constants/common.constant';
import { SwaggerErrorResponse } from '@src/common/decorators/swagger-error-response.decorator';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

// 해당 문서 편집 반드시 필요함. Schema 관련 문서화가 제대로 안되어 있음
export const ApiFancyApp: ApiOperator<keyof FancyAppController> = {
  FindAllForPagination: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiExtraModels(FindAllFancyResponseDto),
      ApiResponse({
        status: 200,
        description: 'Fancy 조회 성공.',
        type: PaginationResponseDto,
        schema: {
          example: {
            data: [
              {
                id: 'a',
                name: 'aName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 1,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 1,
                    name: '모양',
                    subOptions: [
                      {
                        id: 1,
                        optionId: 1,
                        name: '세모',
                        additionalPrice: 100
                      },
                      {
                        id: 2,
                        optionId: 1,
                        name: '네모',
                        additionalPrice: 100
                      },
                      {
                        id: 3,
                        optionId: 1,
                        name: '동그라미',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '색',
                    subOptions: [
                      {
                        id: 4,
                        optionId: 2,
                        name: '빨강',
                        additionalPrice: 100
                      },
                      {
                        id: 5,
                        optionId: 2,
                        name: '파랑',
                        additionalPrice: 100
                      },
                      {
                        id: 6,
                        optionId: 2,
                        name: '초록',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: '질감',
                    subOptions: [
                      {
                        id: 7,
                        optionId: 3,
                        name: '부드러움',
                        additionalPrice: 100
                      }
                    ]
                  }
                ],
                looks: [
                  {
                    id: 1,
                    name: '1번룩',
                    imageUrl: '1번url'
                  },
                  {
                    id: 2,
                    name: '2번룩',
                    imageUrl: '2번url'
                  }
                ],
                tags: [
                  {
                    id: 1,
                    name: '1번태그'
                  }
                ]
              },
              {
                id: 'b',
                name: 'bName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 4,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 1,
                    name: '모양',
                    subOptions: [
                      {
                        id: 1,
                        optionId: 1,
                        name: '세모',
                        additionalPrice: 100
                      },
                      {
                        id: 3,
                        optionId: 1,
                        name: '동그라미',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '색',
                    subOptions: [
                      {
                        id: 4,
                        optionId: 2,
                        name: '빨강',
                        additionalPrice: 100
                      },
                      {
                        id: 5,
                        optionId: 2,
                        name: '파랑',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: '질감',
                    subOptions: [
                      {
                        id: 8,
                        optionId: 3,
                        name: '말랑함',
                        additionalPrice: 100
                      }
                    ]
                  }
                ],
                looks: [
                  {
                    id: 1,
                    name: '1번룩',
                    imageUrl: '1번url'
                  }
                ],
                tags: [
                  {
                    id: 2,
                    name: '2번태그'
                  }
                ]
              },
              {
                id: 'c',
                name: 'cName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 6,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 2,
                    name: '색',
                    subOptions: [
                      {
                        id: 4,
                        optionId: 2,
                        name: '빨강',
                        additionalPrice: 100
                      }
                    ]
                  }
                ],
                looks: [
                  {
                    id: 2,
                    name: '2번룩',
                    imageUrl: '2번url'
                  }
                ],
                tags: [
                  {
                    id: 3,
                    name: '3번태그'
                  }
                ]
              },
              {
                id: 'd',
                name: 'dName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 8,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 1,
                    name: '모양',
                    subOptions: [
                      {
                        id: 2,
                        optionId: 1,
                        name: '네모',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '색',
                    subOptions: [
                      {
                        id: 4,
                        optionId: 2,
                        name: '빨강',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: '질감',
                    subOptions: [
                      {
                        id: 9,
                        optionId: 3,
                        name: '거침',
                        additionalPrice: 100
                      }
                    ]
                  }
                ],
                looks: [
                  {
                    id: 3,
                    name: '3번룩',
                    imageUrl: '3번url'
                  }
                ],
                tags: [
                  {
                    id: 1,
                    name: '1번태그'
                  }
                ]
              },
              {
                id: 'e',
                name: 'eName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 10,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 1,
                    name: '모양',
                    subOptions: [
                      {
                        id: 2,
                        optionId: 1,
                        name: '네모',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: '색',
                    subOptions: []
                  },
                  {
                    id: 3,
                    name: '질감',
                    subOptions: [
                      {
                        id: 7,
                        optionId: 3,
                        name: '부드러움',
                        additionalPrice: 100
                      }
                    ]
                  }
                ],
                looks: [
                  {
                    id: 2,
                    name: '2번룩',
                    imageUrl: '2번url'
                  },
                  {
                    id: 3,
                    name: '3번룩',
                    imageUrl: '3번url'
                  }
                ],
                tags: [
                  {
                    id: 1,
                    name: '1번태그'
                  }
                ]
              },
              {
                id: 'f',
                name: 'fName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [
                  {
                    id: 14,
                    imageUrl: 'url'
                  }
                ],
                fancyOptions: [
                  {
                    id: 1,
                    name: '모양',
                    subOptions: [
                      {
                        id: 1,
                        optionId: 1,
                        name: '세모',
                        additionalPrice: 100
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: '질감',
                    subOptions: []
                  }
                ],
                looks: [
                  {
                    id: 1,
                    name: '1번룩',
                    imageUrl: '1번url'
                  },
                  {
                    id: 3,
                    name: '3번룩',
                    imageUrl: '3번url'
                  }
                ],
                tags: [
                  {
                    id: 2,
                    name: '2번태그'
                  }
                ]
              },
              {
                id: 'g',
                name: 'gName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [],
                fancyOptions: [],
                looks: [
                  {
                    id: 1,
                    name: '1번룩',
                    imageUrl: '1번url'
                  },
                  {
                    id: 3,
                    name: '3번룩',
                    imageUrl: '3번url'
                  }
                ],
                tags: [
                  {
                    id: 2,
                    name: '2번태그'
                  }
                ]
              },
              {
                id: 'h',
                name: 'hName',
                price: 1000,
                costPrice: 1000,
                discountRate: 1000,
                status: 'ACTIVE',
                fancyImages: [],
                fancyOptions: [],
                looks: [],
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
              pageSize: 10,
              totalPages: 1,
              totalCount: 8,
              isLastPage: true,
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
      })
    );
  }
};
