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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const register_dto_1 = require("./dto/register.dto");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const passport_1 = require("@nestjs/passport");
const confirmEmail_dto_1 = require("./dto/confirmEmail.dto");
const resetPassword_dto_1 = require("./dto/resetPassword.dto");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const updateUserSetting_dto_1 = require("./dto/updateUserSetting.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async confirm(confirmEmailDto) {
        return this.authService.confirmEmail(confirmEmailDto);
    }
    resetPassword(req, resetPasswordDto) {
        return this.authService.resetPassword(req.user.email, resetPasswordDto);
    }
    facebookLogIn(req) {
        return req.user;
    }
    vkLogin(req) {
        return req.user;
    }
    googleLogIn(req) {
        return req.user;
    }
    async mainPage(req) {
        return req.user;
    }
    async updateUser(req, updateUserDto) {
        return this.authService.updateUser(req.user.email, updateUserDto);
    }
    async updateUserSettings(req, updateUserSettingDto) {
        return this.authService.updateUserSettings(req.user.email, updateUserSettingDto);
    }
};
__decorate([
    common_1.Post("/RegisterUser"),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post("/login"),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post("/confirm"),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmEmail_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    common_1.Put("/resetPassword"),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resetPassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Get("/facebook"),
    common_1.UseGuards(passport_1.AuthGuard('facebook')),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "facebookLogIn", null);
__decorate([
    common_1.Get("/vk"),
    common_1.UseGuards(passport_1.AuthGuard('vk')),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "vkLogin", null);
__decorate([
    common_1.Get("/google"),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogIn", null);
__decorate([
    common_1.Post("/mainPage"),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "mainPage", null);
__decorate([
    common_1.Put("/updateuser"),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    common_1.Put("/updateUserSettings"),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Request()), __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUserSetting_dto_1.UpdateUserSettingDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserSettings", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map