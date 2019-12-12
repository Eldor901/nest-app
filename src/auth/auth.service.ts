import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtService} from '@nestjs/jwt';
import {UserInfo} from "./dto/user.info.dto";
import {JwtPayload} from "./interface/jwt-payload.interface";
import {ConfirmEmailDto} from "./dto/confirmEmail.dto";
import {MailerService} from '@nest-modules/mailer';
import {ResetPasswordDto} from "./dto/resetPassword.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {UpdateUserSettingDto, UserType} from "./dto/updateUserSetting.dto";
import {User} from "./user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService

    ){}

    async register(registerDto: RegisterDto): Promise<{userId: number}>
    {
        return this.userRepository.register(registerDto);
    }

    async login(loginDto: LoginDto): Promise<{accessToken: string}>
    {
        const userInfo: UserInfo = await this.userRepository.Validatelogin(loginDto);

        if(!userInfo)
        {
            throw new UnauthorizedException("invalid email or password")
        }
        const payload: JwtPayload  = { email: userInfo.email, name: userInfo.name };

        const accessToken: string = await this.jwtService.sign(payload);

        return {accessToken};
    }

    async confirmEmail(confirmEmailDto: ConfirmEmailDto):Promise<ConfirmEmailDto>
    {
        const {email} = await this.userRepository.findEmail(confirmEmailDto.email);

        if(!email)
        {
            throw new UnauthorizedException("invalid email. You haven't registered yet")
        }

        this
            .mailerService
            .sendMail({
                to: 'eldor3143848@gmail.com',
                from: 'omega',
                subject: 'Testing Nest Mailermodule with template ✔',
                context: { 
                    text: 'Link to change password',
                    username: 'OmegaR',
                },
            })
            .then(() => {})
            .catch((e) => {console.log(e)});

        return confirmEmailDto;
    }

    async resetPassword( email:string, resetPasswordDto: ResetPasswordDto):Promise<{userId: number}>
    {
         return await this.userRepository.ChangePassword(email, resetPasswordDto);
    }

    async updateUser(email:string, updatePasswprdDto: UpdateUserDto):Promise<{userId: number}>
    {
        return this.userRepository.UpdateUser(email, updatePasswprdDto);
    }

    async updateUserSettings(email:string,updateUserSettingDto:UpdateUserSettingDto):Promise<{userId: number}>
    {
        const user: User = await this.userRepository.findEmail(email);

        if(!user)
            throw new UnauthorizedException("invalid email. You haven't registered yet");

        if(user.user_type !== UserType.ADMIN)
        {
            throw new BadRequestException("You dont have rights of admin")
        }

        return this.userRepository.updateUserSettings(updateUserSettingDto);
    }
}
