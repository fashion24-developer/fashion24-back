import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { AuthController } from '@src/api/auth/controllers/auth.controller';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

export const ApiAuth: ApiOperator<keyof AuthController> = {
  Login: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiResponse({
        status: 201,
        description: '로그인 성공. (쿠키에 accessToken, refreshToken 저장)',
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsInVzZXJJZCI6MiwiaWF0IjoxNzI1NDE3NDAxLCJleHAiOjE3MjU1MDM4MDF9.PV3OP9jsZxBV75p4SxkypRl0fil_OCfm9OA6MT4n9cI'
            },
            refreshToken: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWZyZXNoVG9rZW4iLCJ1c2VySWQiOjIsImlhdCI6MTcyNTQxNzQwMSwiZXhwIjoxNzI2MDIyMjAxfQ.8q-UrxPk-CuQswqXemufvl6Tb0I_lMWhEkztlxBOxF4'
            }
          }
        }
      }),
      ApiResponse({
        status: 400,
        description: '로그인 요청 시 인가코드가 누락됨.',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 400
            },
            timestamp: {
              type: 'string',
              example: '2024-09-04T04:45:55.410Z'
            },
            path: {
              type: 'string',
              example: '/api/auth/:provider/login'
            },
            message: {
              type: 'string',
              example: 'The code is required for query.'
            }
          }
        }
      }),
      ApiResponse({
        status: 500,
        description: '로그인 중 에러 발생.',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 500
            },
            timestamp: {
              type: 'string',
              example: '2024-09-04T04:10:34.008Z'
            },
            path: {
              type: 'string',
              example: '/api/auth/:provider/login'
            },
            message: {
              type: 'string',
              example: 'Failed to login'
            }
          }
        }
      }),
      ApiParam({
        name: 'provider',
        type: 'string',
        required: true,
        description: '로그인 제공자 (ex: naver, kakao, google)'
      }),
      ApiQuery({
        name: 'code',
        type: 'string',
        required: true,
        description: '소셜 로그인 인가코드'
      })
    );
  },

  Logout: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiResponse({
        status: 200,
        description: '로그아웃 성공.',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 200
            },
            timestamp: {
              type: 'string',
              example: '2024-09-04T04:45:55.410Z'
            }
          }
        }
      }),
      ApiParam({
        name: 'provider',
        type: 'string',
        required: true,
        description: '로그인 제공자 (ex: naver, kakao, google)'
      }),
      ApiCookieAuth('accessToken')
    );
  },

  GetNewAccessToken: (apiOperationOptions: ApiOperationOptionsWithSummary): PropertyDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiResponse({
        status: 200,
        description: '새 accessToken 발급 성공. (쿠키에 accessToken 저장)',
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsInVzZXJJZCI6MiwiaWF0IjoxNzI1NDE3NDAxLCJleHAiOjE3MjU1MDM4MDF9.PV3OP9jsZxBV75p4SxkypRl0fil_OCfm9OA6MT4n9cI'
            }
          }
        }
      }),
      ApiResponse({
        status: 400,
        description: 'BadRequest',
        content: {
          'application/json': {
            examples: {
              'invalid token': {
                value: {
                  statusCode: 400,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'invalid token'
                },
                description: '유효하지 않은 토큰인 경우'
              },
              'jwt must be provided': {
                value: {
                  statusCode: 400,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'jwt must be provided'
                },
                description: '토큰이 제공되지 않은 경우'
              },
              'jwt error': {
                value: {
                  statusCode: 400,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'jwt error'
                },
                description: '그 외 에러 (백엔드에 도움 요청하기)'
              }
            }
          }
        }
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized',
        content: {
          'application/json': {
            examples: {
              'invalid signature': {
                value: {
                  statusCode: 401,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'invalid signature'
                },
                description: '우리 서비스의 토큰이 아닌 경우'
              },
              'token missmatch': {
                value: {
                  statusCode: 401,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'token missmatch'
                },
                description: '토큰이 일치하지 않는 경우'
              },
              'jwt expired': {
                value: {
                  statusCode: 401,
                  timestamp: '2024-09-04T04:45:55.410Z',
                  path: '/api/auth/new-access-token',
                  message: 'jwt expired'
                },
                description: '만료된 토큰인 경우'
              }
            }
          }
        }
      }),
      ApiResponse({
        status: 500,
        description: '새 accessToken 발급 중 에러 발생.',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 500
            },
            timestamp: {
              type: 'string',
              example: '2024-09-04T04:10:34.008Z'
            },
            path: {
              type: 'string',
              example: '/api/auth/new-access-token'
            },
            message: {
              type: 'string',
              example: 'Failed to generate new access token'
            }
          }
        }
      }),
      ApiCookieAuth('refreshToken')
    );
  }
};
