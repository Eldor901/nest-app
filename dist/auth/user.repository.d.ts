import { Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserInfo } from "./dto/user.info.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
export declare class UserRepository extends Repository<User> {
    private m_hashpassword;
    register(registerDto: RegisterDto): Promise<void>;
    findEmail(userEmail: string): Promise<User | undefined>;
    Validatelogin(loginDto: LoginDto): Promise<UserInfo>;
    ChangePassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<void>;
}
