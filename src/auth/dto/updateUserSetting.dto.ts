import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export enum UserType {
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

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


