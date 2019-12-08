import { Strategy } from "passport-vkontakte";
declare const VkStrategy_base: new (...args: any[]) => Strategy;
export declare class VkStrategy extends VkStrategy_base {
    constructor();
    validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any>;
}
export {};
