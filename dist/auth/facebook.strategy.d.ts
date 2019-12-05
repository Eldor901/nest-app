import { Strategy } from "passport-facebook";
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    constructor();
    validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any>;
}
export {};
