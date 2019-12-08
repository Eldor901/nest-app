import { BaseEntity } from "typeorm";
import { UserType } from "./interface/user-setting.interface";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    salt: string;
    user_type: UserType;
}
