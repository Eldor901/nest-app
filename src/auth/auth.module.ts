import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import  {TypeOrmModule} from '@nestjs/typeorm'
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {GoogleStrategy} from "./strategyTS/google.strategy";
import {JwtStrategy} from "./strategyTS/jwt.strategy";
import {FacebookStrategy} from "./strategyTS/facebook.strategy";
import {VkStrategy} from "./strategyTS/vk.strategy";
import {HandlebarsAdapter, MailerModule, MailerService} from "@nest-modules/mailer";
import * as config from 'config';

const SendMailer = config.get('SendMailer');
const jwtConf = config.get('jwt');

@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      PassportModule.register({ session: true }),
      MailerModule.forRootAsync({
          useFactory: () => ({
              transport: {
                host: SendMailer.host,
                port: SendMailer.port,
                auth:{
                    user: SendMailer.user,
                    pass: SendMailer.pass,
                }
              },
              defaults: {
                  from:'"nest-modules" <modules@nestjs.com>',
              }
          }),
      }),
      JwtModule.register({
          secret: jwtConf.secret,
          signOptions: { expiresIn: jwtConf.expiresTime },
      }),
      TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy,
      FacebookStrategy, VkStrategy],
  exports: [AuthService],

})


export class AuthModule {}
