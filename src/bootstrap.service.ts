import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapService {
  async startingServer(app: INestApplication) {
    await app.listen(3000);

    console.info(`Server listening on port 3000`);
  }
}
