import {Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-facebook"

@Injectable()

export class VkStrategy extends PassportStrategy(Strategy, 'vk')
{
    constructor()
    {
        super({
            clientID    : '7227244',
            clientSecret: '03a5240e03a5240e03a5240edd03cb6362003a503a5240e5e45c17937fd22b09312982a',
            callbackURL: 'http://localhost:3000/auth/vk',
            passReqToCallback: true,
            scope: ['profile']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}