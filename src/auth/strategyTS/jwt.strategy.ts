import {PassportStrategy} from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import {jwtConstants} from "../constants";
import {Injectable} from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }


    async validate(payload: any)
    {
        return {name: payload.name, email: payload.email} ;
    }
}