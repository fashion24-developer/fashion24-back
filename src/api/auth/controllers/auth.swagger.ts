import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath
} from '@nestjs/swagger';

import { AuthController } from '@src/api/auth/controllers/auth.controller';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import {
  COMMON_ERROR_HTTP_STATUS_CODE,
  COMMON_ERROR_HTTP_STATUS_MESSAGE
} from '@src/common/constants/common.constant';
import { SwaggerErrorResponse } from '@src/common/decorators/swagger-error-response.decorator';
import { ResponseDto } from '@src/common/dtos/response.dto';
import { ApiOperationOptionsWithSummary, ApiOperator } from '@src/common/types/common.type';

export const ApiAuth: ApiOperator<keyof AuthController> = {
  Login: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
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
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[400],
        [
          {
            description: '로그인 요청 시 인가코드가 누락됨.',
            message: 'The code is required for query.'
          }
        ],
        `${AuthController.path}/:provider/login`
      ),
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[500],
        [
          {
            description: '로그인 중 에러 발생.',
            message: 'Failed to login'
          }
        ],
        `${AuthController.path}/:provider/login`
      ),
      ApiParam({
        name: 'provider',
        enum: UserProvider,
        required: true,
        description: '소셜 정보 제공자'
      }),
      ApiQuery({
        name: 'code',
        type: 'string',
        required: true,
        description: '소셜 로그인 인가코드'
      })
    );
  },

  Logout: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions
      }),
      ApiExtraModels(ResponseDto),
      ApiResponse({
        status: 200,
        description: '로그아웃 성공.',
        content: {
          'application/json': {
            schema: {
              $ref: getSchemaPath(ResponseDto)
            },
            example: {
              statusCode: 200,
              message: 'Logout successful'
            }
          }
        }
      }),
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[500],
        [
          {
            description: '로그아웃 중 에러 발생.',
            message: 'Failed to logout'
          }
        ],
        `${AuthController.path}/:provider/logout`
      ),
      ApiParam({
        name: 'provider',
        enum: UserProvider,
        required: true,
        description: '소셜 정보 제공자'
      }),
      ApiCookieAuth('accessToken')
    );
  },

  GetNewAccessToken: (apiOperationOptions: ApiOperationOptionsWithSummary): MethodDecorator => {
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
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[400],
        [
          {
            description: '유효하지 않은 토큰인 경우',
            message: 'invalid token'
          },
          {
            description: '토큰이 제공되지 않은 경우',
            message: 'jwt must be provided'
          },
          {
            description: '그 외 에러 (백엔드에 도움 요청하기)',
            message: 'jwt error'
          }
        ],
        `${AuthController.path}/new-access-token`
      ),
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.UNAUTHORIZED,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[401],
        [
          {
            description: '우리 서비스의 토큰이 아닌 경우',
            message: 'invalid signature'
          },
          {
            description: '토큰이 일치하지 않는 경우',
            message: 'token missmatch'
          },
          {
            description: '만료된 토큰인 경우',
            message: 'jwt expired'
          },
          {
            description: '토큰을 redis에서 찾을 수 없는 경우',
            message: 'token not found'
          }
        ],
        `${AuthController.path}/new-access-token`
      ),
      SwaggerErrorResponse(
        COMMON_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        COMMON_ERROR_HTTP_STATUS_MESSAGE[500],
        [
          {
            description: '새 accessToken 발급 중 에러 발생.',
            message: 'Failed to generate new access token'
          }
        ],
        `${AuthController.path}/new-access-token`
      ),
      ApiCookieAuth('refreshToken')
    );
  }
};
