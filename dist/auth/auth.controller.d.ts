import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ConfirmEmailDto } from "./dto/confirmEmail.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdateUserSettingDto } from "./dto/updateUserSetting.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    confirm(confirmEmailDto: ConfirmEmailDto): Promise<ConfirmEmailDto>;
    resetPassword(req: any, resetPasswordDto: ResetPasswordDto): Promise<void>;
    facebookLogIn(req: any): any;
    vkLogin(req: any): any;
    googleLogIn(req: any): any;
    mainPage(req: any): Promise<any>;
    updateUser(req: any, updateUserDto: UpdateUserDto): Promise<void>;
    updateUserSettings(req: any, updateUserSettingDto: UpdateUserSettingDto): Promise<void>;
}
