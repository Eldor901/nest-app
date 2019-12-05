import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import  {TypeOrmModule} from '@nestjs/typeorm'
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {GoogleStrategy} from "./strategyTS/google.strategy";
import {JwtStrategy} from "./strategyTS/jwt.strategy";
import {FacebookStrategy} from "./strategyTS/facebook.strategy";
import {VkStrategy} from "./strategyTS/vk.strategy";

@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      PassportModule.register({ session: true }),
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '600s' },
      }),
      TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy,
      FacebookStrategy, VkStrategy],
  exports: [AuthService],

})


export class AuthModule {}
