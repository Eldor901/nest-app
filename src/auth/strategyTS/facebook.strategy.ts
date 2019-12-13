import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-facebook";
import * as config from  'config'

const AuthApiFacebook = config.get('AuthApiFacebook');

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook')
{

    constructor()
    {
        super({
            clientID    : AuthApiFacebook.clientID,
            clientSecret: AuthApiFacebook.clientSecret,
            callbackURL:  AuthApiFacebook.callbackURL,
            passReqToCallback: true,
            scope: ['']
        } )
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        return profile;
    }
}