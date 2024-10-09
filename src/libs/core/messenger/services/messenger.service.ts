import { Injectable } from '@nestjs/common';

import { SlackService } from 'nestjs-slack';

import { ValueOf } from '@src/common/types/common.type';
import { IMessengerService } from '@src/libs/core/messenger/services/i-messenger-service.interface';
import { slackChannel } from '@src/libs/core/messenger/types/app-slack.type';

@Injectable()
export class MessengerService implements IMessengerService {
  constructor(private readonly slackService: SlackService<ValueOf<typeof slackChannel>>) {}

  sendInternalServerError(error: Error): Promise<void> {
    return this.slackService.sendText(
      `서버 내부 에러 발생(500번 에러)
      error name: ${error.name}
      error message: ${error.message}
      error stack: ${error.stack}`,
      {
        channel: slackChannel.internalServerError
      }
    );
  }
}
