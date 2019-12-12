import {PassportStrategy} from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import {Injectable} from "@nestjs/common";
import * as config from 'config';

const JwtConf = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: JwtConf.secret,
        });
    }


    async validate(payload: any)
    {
        return {name: payload.name, email: payload.email} ;
    }
}