import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {RegisterDto} from "./dto/register.dto";
import {BadRequestException, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {genSalt, hash} from "bcrypt"
import {LoginDto} from "./dto/login.dto";
import {UserInfo} from "./dto/user.info.dto";
import {ResetPasswordDto} from "./dto/resetPassword.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {UserType} from "./dto/updateUserSetting.dto";
import {UpdateUserSettingDto} from "./dto/updateUserSetting.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    private async m_hashpassword(password:string, hashing: string): Promise<string>
    {
        return hash(password, hashing);
    }

    async register(registerDto: RegisterDto): Promise<{userId: number}>{
        const{name, email, password} = registerDto;

        const user: User = new User();
        user.name = name;
        user.email = email;

        user.salt  = await genSalt();
        user.password = await this.m_hashpassword(password, user.salt);
        user.user_type = UserType.USER;

        try {
            await user.save();
            return {userId: user.id};
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

    async ChangePassword(email:string, resetPasswordDto:ResetPasswordDto): Promise<{userId: number}>
    {
        const user: User  =  await this.findEmail(email);

        if (!user)
        {
            throw new UnauthorizedException("this kind of email doesnt exists");
        }

        const {password} = resetPasswordDto;

        user.salt = await genSalt();

        user.password = await this.m_hashpassword(password, user.salt);

        try {
            await user.save();
            return {userId: user.id}
        }
        catch(err){
            throw new InternalServerErrorException("password is not changed");
        }
    }


    async UpdateUser(email:string, updateUserDto:UpdateUserDto):Promise<{userId: number}>
    {
        const user: User = await this.findEmail(email);

        const {name, password} = updateUserDto;

        await this.ChangePassword(email, {password});

        user.name = name;
        try {
            await user.save();
            return {userId: user.id}
        }
        catch(err){
            throw new InternalServerErrorException("password is not changed");
        }

    }

    async updateUserSettings(updateUserSettingDto:UpdateUserSettingDto):Promise<{userId: number}>
    {
        const {email, user_type} = updateUserSettingDto;

        const user: User =  await this.findEmail(email);

        if (!user)
        {
            throw new UnauthorizedException("this kind of email doesnt exists");
        }

        if (!(user_type in UserType))
            throw new BadRequestException(`UserType: '${user_type}' does not exists`);

        user.user_type = user_type;

        try {
            await user.save();
            return {userId: user.id};
        }
        catch(err){
            throw new InternalServerErrorException("user type is not changed");
        }
    }
}