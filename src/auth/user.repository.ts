import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {RegisterDto} from "./dto/register.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {genSalt, hash} from "bcrypt"
import {LoginDto} from "./dto/login.dto";
import {UserInfo} from "./dto/user.info.dto";
import {ResetPasswordDto} from "./dto/resetPassword.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    private async m_hashpassword(password:string, hashing: string): Promise<string>
    {
        return hash(password, hashing);
    }

    async register(registerDto: RegisterDto): Promise<void>{
        const{name, email, password} = registerDto;

        const user = new User();
        user.name = name;
        user.email = email;

        user.salt  = await genSalt();
        user.password = await this.m_hashpassword(password, user.salt);


        try {
            await user.save();
        }
        catch(err){
            throw new InternalServerErrorException("This kind of email is already exists");
        }
    }


    async findEmail(userEmail: string): Promise<User|undefined>
    {
        return User.findOne({email: userEmail});
    }


    async Validatelogin(loginDto: LoginDto): Promise<UserInfo>
    {
        const {email, password} = loginDto;
        const user = await this.findEmail(email);

        if (user) {
            let salt: string = user.salt;
            let passwordCheck = await this.m_hashpassword(password, salt);

            if (user.password === passwordCheck) {

                let userInfo = new UserInfo();
                userInfo.name = user.name;
                userInfo.email = user.email;

                return userInfo;
            }
        }

        return null;
    }

    async ChangePassword(email:string, resetPasswordDto:ResetPasswordDto): Promise<void>
    {
        const user: User  =  await this.findEmail(email);

        const {password} = resetPasswordDto;

        console.log(password);
        user.salt = await genSalt();

        user.password = await this.m_hashpassword(password, user.salt);


        try {
            await user.save();
        }
        catch(err){
            throw new InternalServerErrorException("password is not changed");
        }
    }
}