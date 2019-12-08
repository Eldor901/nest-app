export interface UserSettingInterface{
    status: UserType;
}

export enum UserType {
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
    USER = 'USER',
}
