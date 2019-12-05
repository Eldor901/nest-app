import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      TasksModule,
      AuthModule,
      MailerModule.forRootAsync({
          useFactory: () => ({
              transport: 'smtps://user@domain.com:pass@smtp.domain.com',
              defaults: {
                  from:'"nest-modules" <modules@nestjs.com>',
              },
              template: {
                  dir: __dirname + '/templates',
                  adapter: new HandlebarsAdapter(), // or new PugAdapter()
                  options: {
                      strict: true,
                  },
              },
          }),
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
