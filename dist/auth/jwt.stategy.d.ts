import { Strategy } from 'passport-jwt';
declare const JwtStategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStategy extends JwtStategy_base {
    constructor();
    validate(payload: any): Promise<{
        name: any;
        email: any;
    }>;
}
export {};
