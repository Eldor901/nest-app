import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-facebook";


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook')
{

    constructor()
    {
        super({
            clientID    : '442983963291730',
            clientSecret: 'af1ef52f71ff40801ae7346926e8ca18',
            callbackURL: 'http://localhost:3000/auth/facebook',
            passReqToCallback: true,
            scope: ['']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}