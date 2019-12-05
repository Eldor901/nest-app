import {IsEmail, IsNotEmpty} from "class-validator";


export  class ConfirmEmailDto{

    @IsEmail({},
        {
            message: "Email is Invalid",
        }
    )
    email:string;

}