import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth2";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor()
    {
        super({
            clientID    : '439979850164-tlct50ksq8p2qef325mk8tbkrgs5s1cu.apps.googleusercontent.com',
            clientSecret: '4_Kr92qiPrrOpNkcg1-0YcRc',
            callbackURL: 'http://localhost:3000/auth/google',
            passReqToCallback: true,
            scope: ['profile']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}