import isEmail = require("validator/lib/isEmail");
import {IsEmail, IsNotEmpty} from "class-validator";


export  class LoginDto{

    @IsEmail({},
        {
            message: "Email is Invalid",
        }
    )
    email:string;


    @IsNotEmpty()
    password: string;

}