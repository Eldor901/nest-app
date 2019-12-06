import {IsNotEmpty, MinLength} from "class-validator";

export class ResetPasswordDto{
    @MinLength(6,{
        message: "Your password should contain at least 6 character",
    })

    @IsNotEmpty()
    password: string;
}