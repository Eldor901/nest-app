import { UserRepository } from "./user.repository";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfirmEmailDto } from "./dto/confirmEmail.dto";
import { MailerService } from '@nest-modules/mailer';
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdateUserSettingDto } from "./dto/updateUserSetting.dto";
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly mailerService;
    constructor(userRepository: UserRepository, jwtService: JwtService, mailerService: MailerService);
    register(registerDto: RegisterDto): Promise<{
        userId: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<ConfirmEmailDto>;
    resetPassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<{
        userId: number;
    }>;
    updateUser(email: string, updatePasswprdDto: UpdateUserDto): Promise<{
        userId: number;
    }>;
    updateUserSettings(email: string, updateUserSettingDto: UpdateUserSettingDto): Promise<{
        userId: number;
    }>;
}
