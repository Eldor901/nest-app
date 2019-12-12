declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any>;
}
export {};
