import {Body, Controller, Get, Post, Put, Req, Request, Res, UseGuards, ValidationPipe} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import { ConfirmEmailDto} from "./dto/confirmEmail.dto";
import {ResetPasswordDto} from "./dto/resetPassword.dto";

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


   @Post("/confirm")
   async confirm(@Body(ValidationPipe) confirmEmailDto:ConfirmEmailDto):Promise<ConfirmEmailDto>
   {
       return this.authService.confirmEmail(confirmEmailDto);
   }

   @Put("/reset")
   @UseGuards(AuthGuard('jwt'))
   resetPassword(@Request() req, @Body(ValidationPipe) resetPasswordDto:ResetPasswordDto):Promise<void>
   {
      return this.authService.resetPassword(req.user.email, resetPasswordDto);
   }

   @Get("/google")
   @UseGuards(AuthGuard('google'))
   googleLogIn(@Request() req)
   {
       return req.user;
   }

    @Get("/vk")
    @UseGuards(AuthGuard('vk'))
    vkLogin(@Request() req)
    {
        return req.user;
    }


   @Get("/facebook")
   @UseGuards(AuthGuard('facebook'))
   facebookLogIn(@Request() req)
   {
       return req.user;
   }

    @Post("/mainPage")
    @UseGuards(AuthGuard('jwt'))
    async mainPage(@Request() req)
    {
        return req.user;
    }

}
