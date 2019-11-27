import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {

    constructor(
      private authService:AuthService
    ){}

   @Post("/register")
   async register(@Body(ValidationPipe) registerDto:RegisterDto): Promise<void>{
        return this.authService.register(registerDto);
   }

   @Post("/login")
   async login(@Body(ValidationPipe) loginDto:LoginDto): Promise<{accessToken: string}>
   {
       return this.authService.login(loginDto);
   }
}
