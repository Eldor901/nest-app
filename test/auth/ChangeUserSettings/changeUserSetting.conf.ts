export interface User
{
    email: string;
    user_type: string;
}


export let UserTypeChange: User[]= [
    {
        email: "jack1@gmail.com", user_type: "MODERATOR"
    },
    {
        email: "bob@gmail.com", user_type: "ADMIN"
    },

];


export const UserTypeForbitChange: User[]=[
    {
        email: "jack1@gmail.com", user_type: "NewMODERATOR"
    },

];