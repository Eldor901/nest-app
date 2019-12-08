import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {UserType} from "../interface/user-setting.interface";

export class UpdateUserSettingDto{
    @IsEmail({},
        {
            message: "Email is Invalid",
        }
    )
    email: string;

    @IsNotEmpty()
    user_type: UserType;
}