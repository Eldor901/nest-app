import { Strategy } from "passport-jwt";
declare const resetPasswordJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class resetPasswordJwtStrategy extends resetPasswordJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        email: any;
    }>;
}
export {};
