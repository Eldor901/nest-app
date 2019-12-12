import { BaseEntity } from "typeorm";
import { UserType } from "./dto/updateUserSetting.dto";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    salt: string;
    user_type: UserType;
}
