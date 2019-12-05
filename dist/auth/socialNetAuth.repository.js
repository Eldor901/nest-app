"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth2_1 = require("passport-google-oauth2");
class SocialNetAuthRepository extends passport_google_oauth2_1.OAuth2Strategy {
    constructor() {
        super({
            clientID: 'AIzaSyBLCPfMAaeArLjuuCGaKtzih3HJEZnPFC4',
            callbackURL: 'http://YOUR_SERVER:YOUR_PORT/auth/google/callback',
            passReqToCallback: true,
        });
    }
}
exports.SocialNetAuthRepository = SocialNetAuthRepository;
//# sourceMappingURL=socialNetAuth.repository.js.map