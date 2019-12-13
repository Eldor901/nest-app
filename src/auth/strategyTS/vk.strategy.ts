import {Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-vkontakte"
import * as config from 'config';

const AuthApiVk  = config.get("AuthApiVk");

@Injectable()

export class VkStrategy extends PassportStrategy(Strategy, 'vk')
{
    constructor()
    {
        super({
            clientID    : AuthApiVk.clientID,
            clientSecret: AuthApiVk.clientSecret,
            callbackURL:  AuthApiVk.callbackURL,
            passReqToCallback: true,
            scope: ['']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}