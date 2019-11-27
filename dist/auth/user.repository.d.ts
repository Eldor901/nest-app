import { Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
export declare class UserRepository extends Repository<User> {
    private m_hashpassword;
    register(registerDto: RegisterDto): Promise<void>;
    private findEmail;
    Validatelogin(loginDto: LoginDto): Promise<string>;
}
