import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';
import {UserInfo} from "./dto/user.info.dto";
import {JwtPayload} from "./interface/jwt-payload.interface";
import {ConfirmEmailDto} from "./dto/confirmEmail.dto";
import * as nodemailer from  "nodemailer"
import { MailerService } from '@nest-modules/mailer';
import * as passport from "passport";
import {ResetPasswordDto} from "./dto/resetPassword.dto";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService

    ){}

    async register(registerDto: RegisterDto): Promise<void>
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
                to: 'Eldor3143848@gmail.com',
                from: 'omega',
                subject: 'Testing Nest Mailermodule with template ✔',
                template: __dirname + '/welcome', // The `.pug` or `.hbs` extension is appended automatically.
                context: {  // Data to be sent to template engine.
                    code: 'cf1a3f828287',
                    username: 'john doe',
                },
            })
            .then(() => {})
            .catch(() => {});

        return confirmEmailDto;
    }

    async resetPassword( email:string, resetPasswordDto: ResetPasswordDto):Promise<void>
    {
        return this.userRepository.ChangePassword(email, resetPasswordDto);
    }
}
