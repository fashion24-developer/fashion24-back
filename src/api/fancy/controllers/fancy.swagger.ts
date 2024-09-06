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
      })
    );
  }
};
