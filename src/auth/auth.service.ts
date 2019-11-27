import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {User} from "./user.entity";
import { JwtService } from '@nestjs/jwt';
import {JwtPayload} from "./interface/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto): Promise<void>
    {
        return this.userRepository.register(registerDto);
    }

    async login(loginDto: LoginDto): Promise<{accessToken: string}>
    {
        const userEmail = await this.userRepository.Validatelogin(loginDto);
        if(!userEmail)
        {
            throw new UnauthorizedException("invalid email or password")
        }

        const payload  = { userEmail };

        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
}
