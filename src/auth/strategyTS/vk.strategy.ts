import {Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-vkontakte"

@Injectable()

export class VkStrategy extends PassportStrategy(Strategy, 'vk')
{
    constructor()
    {
        super({
            clientID    : '7227244',
            clientSecret: 'SDxnqAAW2FpjbJm4Hytg',
            callbackURL: 'http://localhost:3000/auth/vk',
            passReqToCallback: true,
            scope: ['']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}