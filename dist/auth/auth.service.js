"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nest-modules/mailer");
const updateUserSetting_dto_1 = require("./dto/updateUserSetting.dto");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async register(registerDto) {
        return this.userRepository.register(registerDto);
    }
    async login(loginDto) {
        const userInfo = await this.userRepository.Validatelogin(loginDto);
        if (!userInfo) {
            throw new common_1.UnauthorizedException("invalid email or password");
        }
        const payload = { email: userInfo.email, name: userInfo.name };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async confirmEmail(confirmEmailDto) {
        const { email } = await this.userRepository.findEmail(confirmEmailDto.email);
        if (!email) {
            throw new common_1.UnauthorizedException("invalid email. You haven't registered yet");
        }
        const payload = { email: email };
        const accessToken = await this.jwtService.sign(payload);
        this
            .mailerService
            .sendMail({
            to: 'eldor3143848@gmail.com',
            from: 'omega',
            subject: 'Testing Nest Mailermodule with template ✔',
            context: {
                text: `change your password ${accessToken}`,
                username: 'OmegaR',
            },
        })
            .then(() => { })
            .catch((e) => { console.log(e); });
        return confirmEmailDto;
    }
    async resetPassword(email, resetPasswordDto) {
        return await this.userRepository.ChangePassword(email, resetPasswordDto);
    }
    async updateUser(email, updatePasswprdDto) {
        return this.userRepository.UpdateUser(email, updatePasswprdDto);
    }
    async updateUserSettings(email, updateUserSettingDto) {
        const user = await this.userRepository.findEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException("invalid email. You haven't registered yet");
        if (user.user_type !== updateUserSetting_dto_1.UserType.ADMIN) {
            throw new common_1.BadRequestException("You dont have rights of admin");
        }
        return this.userRepository.updateUserSettings(updateUserSettingDto);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map