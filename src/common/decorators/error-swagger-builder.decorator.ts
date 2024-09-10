import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ExampleObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import {
  COMMON_ERROR_HTTP_STATUS_CODE,
  COMMON_ERROR_HTTP_STATUS_MESSAGE
} from '@src/common/constants/common.constant';
import { ValueOf } from '@src/common/types/common.type';

const messageStringType = {
  type: 'string',
  description: '에러 메세지.'
};

const messageArrayType = {
  type: 'array',
  description:
    'array 타입의 에러 메세지. \n Enum 내에 값이 없고 example이 없다면 해당 타입의 message는 response로 오지 않음'
};

/**
 * @description error에 대한 response를 swagger에 명세 해주기 위한 builder
 *
 * @param statusCode HTTP status code (400번~500번대)
 * @param path 요청한 API 경로
 * @param error HTTP status message
 * @param msgAndDescription 에러 메시지 및 설명 배열
 */
export const ErrorSwaggerBuilder = (
  statusCode: ValueOf<typeof COMMON_ERROR_HTTP_STATUS_CODE>,
  error: ValueOf<typeof COMMON_ERROR_HTTP_STATUS_MESSAGE>,
  msgAndDescription: { message: string | string[]; description: string }[] = [
    { message: '에러에 대한 메세지', description: '에러가 발생한 이유' }
  ],
  // 이런 식으로 하나하나 정의해놓은 path만 타입으로 들어올 수 있게 강제할 수 있는데 공수가 좀 드는듯
  // path: ValueOf<typeof routesV1.user>,
  path: string = '/api'
): ClassDecorator & MethodDecorator => {
  const timestamp = new Date().toISOString();

  const examples = msgAndDescription.reduce<
    Record<string, Pick<ExampleObject, 'value' | 'description'>>
  >((acc, { description, message }) => {
    acc[description] = {
      description,
      value: {
        statusCode,
        timestamp,
        path,
        message: {
          message: Array.isArray(message) ? [...message] : message,
          error,
          statusCode
        }
      }
    };
    return acc;
  }, {});

  const messageEnum = Object.values(examples).map((example) => example.value.message.message);

  const msgStringEnum = messageEnum.filter((msg): msg is string => typeof msg === 'string');
  const msgArrayEnum = [...new Set(messageEnum.filter(Array.isArray).flat())];

  return applyDecorators(
    ApiResponse({
      status: statusCode,
      content: {
        'application/json': {
          schema: {
            properties: {
              timestamp: {
                description: '에러 발생 시각',
                type: 'string',
                format: 'date-time',
                example: timestamp
              },
              path: {
                description: '요청한 API의 path',
                type: 'string',
                example: path
              },
              message: {
                properties: {
                  error: {
                    description: 'HTTP status message',
                    type: 'string',
                    enum: Object.values(COMMON_ERROR_HTTP_STATUS_MESSAGE),
                    example: error
                  },
                  statusCode: {
                    description: 'HTTP status code',
                    type: 'number',
                    enum: Object.values(COMMON_ERROR_HTTP_STATUS_CODE),
                    example: statusCode
                  },
                  message: {
                    oneOf: [
                      {
                        title: 'StringMessage',
                        ...messageStringType,
                        enum: msgStringEnum,
                        example: msgStringEnum[0]
                      },
                      {
                        title: 'ArrayMessage',
                        ...messageArrayType,
                        items: {
                          type: 'string',
                          enum: msgArrayEnum,
                          example: msgArrayEnum.length ? `[${msgArrayEnum}]` : undefined
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          examples
        }
      }
    })
  );
};
