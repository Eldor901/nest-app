import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from  'config'
import {from} from "rxjs";

const Server = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Server.port);
}

bootstrap();
