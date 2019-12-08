export interface UserSettingInterface {
    status: UserType;
}
export declare enum UserType {
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
    USER = "USER"
}
