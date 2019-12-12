import {Body, Controller, Get, Post, Put, Req, Request, Res, UseGuards, ValidationPipe} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import { ConfirmEmailDto} from "./dto/confirmEmail.dto";
import {ResetPasswordDto} from "./dto/resetPassword.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {UpdateUserSettingDto} from "./dto/updateUserSetting.dto";

@Controller('auth')
export class AuthController {

    constructor(
      private authService:AuthService
    ){}

   @Post("/RegisterUser")
   async register(@Body(ValidationPipe) registerDto:RegisterDto): Promise<{userId: number}>{
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

   @Put("/resetPassword")
   @UseGuards(AuthGuard('jwt'))
   resetPassword(@Request() req, @Body(ValidationPipe) resetPasswordDto:ResetPasswordDto):Promise<{userId: number}>
   {
      return this.authService.resetPassword(req.user.email, resetPasswordDto);
   }


   @Get("/facebook")
   @UseGuards(AuthGuard('facebook'))
   facebookLogIn(@Request() req)
   {
       return req.user;
   }

    @Get("/vk")
    @UseGuards(AuthGuard('vk'))
    vkLogin(@Request() req)
    {
        return req.user;
    }


    @Get("/google")
    @UseGuards(AuthGuard('google'))
    googleLogIn(@Request() req)
    {
        return req.user;
    }

    @Post("/mainPage")
    @UseGuards(AuthGuard('jwt'))
    async mainPage(@Request() req)
    {
        return req.user;
    }

    @Put("/updateuser")
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Request() req, @Body(ValidationPipe) updateUserDto: UpdateUserDto):Promise<{userId: number}>
    {
        return this.authService.updateUser(req.user.email, updateUserDto);
    }

    @Put("/updateUserSettings")
    @UseGuards(AuthGuard('jwt'))
    async updateUserSettings(@Request() req, @Body(ValidationPipe) updateUserSettingDto: UpdateUserSettingDto):Promise<{userId: number}>
    {
        return this.authService.updateUserSettings(req.user.email, updateUserSettingDto);
    }
}
