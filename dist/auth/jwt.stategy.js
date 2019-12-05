"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("./constants");
class JwtStategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
    }
    async validate(payload) {
        return { name: payload.name, email: payload.email };
    }
}
exports.JwtStategy = JwtStategy;
//# sourceMappingURL=jwt.stategy.js.map