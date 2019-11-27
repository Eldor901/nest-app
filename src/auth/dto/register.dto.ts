import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class  RegisterDto{

    @IsNotEmpty()
    name: string;

    @IsEmail({},
        {
            message: "Email is Invalid",
        }
    )
    email: string;

    @MinLength(6,{
        message: "Your password should contain at least 6 character",
    })

    @IsNotEmpty()
    password: string;
}