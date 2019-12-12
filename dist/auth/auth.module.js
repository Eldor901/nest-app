"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const user_entity_1 = require("./user.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const google_strategy_1 = require("./strategyTS/google.strategy");
const jwt_strategy_1 = require("./strategyTS/jwt.strategy");
const facebook_strategy_1 = require("./strategyTS/facebook.strategy");
const vk_strategy_1 = require("./strategyTS/vk.strategy");
const mailer_1 = require("@nest-modules/mailer");
const config = require("config");
const SendMailer = config.get('SendMailer');
const jwtConf = config.get('jwt');
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            passport_1.PassportModule.register({ session: true }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: SendMailer.host,
                        port: SendMailer.port,
                        auth: {
                            user: SendMailer.user,
                            pass: SendMailer.pass,
                        }
                    },
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>',
                    }
                }),
            }),
            jwt_1.JwtModule.register({
                secret: jwtConf.secret,
                signOptions: { expiresIn: jwtConf.expiresTime },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_repository_1.UserRepository]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, google_strategy_1.GoogleStrategy, jwt_strategy_1.JwtStrategy,
            facebook_strategy_1.FacebookStrategy, vk_strategy_1.VkStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map