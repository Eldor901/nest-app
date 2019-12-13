import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth2";
import * as config from  'config'

const AuthApiGoogle = config.get('AuthApiGoogle');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor()
    {
        super({
            clientID    : AuthApiGoogle.clientID,
            clientSecret: AuthApiGoogle.clientSecret,
            callbackURL: AuthApiGoogle.callbackURL,
            passReqToCallback: true,
            scope: ['profile']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}