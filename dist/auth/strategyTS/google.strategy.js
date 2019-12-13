"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const config = require("config");
const AuthApiGoogle = config.get('AuthApiGoogle');
let GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth2_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: AuthApiGoogle.clientID,
            clientSecret: AuthApiGoogle.clientSecret,
            callbackURL: AuthApiGoogle.callbackURL,
            passReqToCallback: true,
            scope: ['profile']
        });
    }
    async validate(request, accessToken, refreshToken, profile, done) {
        return profile;
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map