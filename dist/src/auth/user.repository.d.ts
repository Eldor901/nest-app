import { Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserInfo } from "./dto/user.info.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdateUserSettingDto } from "./dto/updateUserSetting.dto";
export declare class UserRepository extends Repository<User> {
    private m_hashpassword;
    register(registerDto: RegisterDto): Promise<{
        userId: number;
    }>;
    findEmail(userEmail: string): Promise<User | undefined>;
    Validatelogin(loginDto: LoginDto): Promise<UserInfo>;
    ChangePassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<{
        userId: number;
    }>;
    UpdateUser(email: string, updateUserDto: UpdateUserDto): Promise<{
        userId: number;
    }>;
    updateUserSettings(updateUserSettingDto: UpdateUserSettingDto): Promise<{
        userId: number;
    }>;
}
