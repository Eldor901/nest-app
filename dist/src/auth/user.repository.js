"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const user_info_dto_1 = require("./dto/user.info.dto");
const updateUserSetting_dto_1 = require("./dto/updateUserSetting.dto");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async m_hashpassword(password, hashing) {
        return bcrypt_1.hash(password, hashing);
    }
    async register(registerDto) {
        const { name, email, password } = registerDto;
        const user = new user_entity_1.User();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt_1.genSalt();
        user.password = await this.m_hashpassword(password, user.salt);
        user.user_type = updateUserSetting_dto_1.UserType.USER;
        try {
            await user.save();
            return { userId: user.id };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("This kind of email is already exists");
        }
    }
    async findEmail(userEmail) {
        return user_entity_1.User.findOne({ email: userEmail });
    }
    async Validatelogin(loginDto) {
        const { email, password } = loginDto;
        const user = await this.findEmail(email);
        if (user) {
            let salt = user.salt;
            let passwordCheck = await this.m_hashpassword(password, salt);
            if (user.password === passwordCheck) {
                let userInfo = new user_info_dto_1.UserInfo();
                userInfo.name = user.name;
                userInfo.email = user.email;
                return userInfo;
            }
        }
        return null;
    }
    async ChangePassword(email, resetPasswordDto) {
        const user = await this.findEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("this kind of email doesnt exists");
        }
        const { password } = resetPasswordDto;
        user.salt = await bcrypt_1.genSalt();
        user.password = await this.m_hashpassword(password, user.salt);
        try {
            await user.save();
            return { userId: user.id };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("password is not changed");
        }
    }
    async UpdateUser(email, updateUserDto) {
        const user = await this.findEmail(email);
        const { name, password } = updateUserDto;
        await this.ChangePassword(email, { password });
        user.name = name;
        try {
            await user.save();
            return { userId: user.id };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("password is not changed");
        }
    }
    async updateUserSettings(updateUserSettingDto) {
        const { email, user_type } = updateUserSettingDto;
        const user = await this.findEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("this kind of email doesnt exists");
        }
        if (!(user_type in updateUserSetting_dto_1.UserType))
            throw new common_1.BadRequestException(`UserType: '${user_type}' does not exists`);
        user.user_type = user_type;
        try {
            await user.save();
            return { userId: user.id };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("user type is not changed");
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map