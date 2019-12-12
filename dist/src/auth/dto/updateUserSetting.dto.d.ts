export declare enum UserType {
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class UpdateUserSettingDto {
    email: string;
    user_type: UserType;
}
