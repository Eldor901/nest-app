export interface AuthUser
{
    email: string;
    password: string;
}

export let AutheredUsersGiveAccsess: AuthUser[] =
    [
        {
         email: "eldor9012545@gmail.com", password: "12345678",
        },
        {
            email: "jack1@gmail.com", password: "OneTwoThree",
        },
    ];


export let ForbitAcess: AuthUser[] =
    [
        {
            email: "", password: "12345678",
        },

        {
            email: "eldor9012545@gmail", password: ""
        },

        {
            email: "eldor", password: ""
        },

        {
            email: "unknowPerson@gmail.com", password: "12345678"
        }
    ];