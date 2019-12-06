
export interface UserRegister
{
    name: string;
    email: string;
    password: string;
}


export let UserRegisterTestSucces: UserRegister[] = [
    {
        name: "eldor", email: "eldor9012545@gmail.com", password: "12345678",
    },
    {
        name: "1jack", email: "jack1@gmail.com", password: "OneTwoThree",
    },
];

export let UserRegisterTestForbit: UserRegister[] =[
    {
        name: "", email: "eldor9012523@gmalil.com", password: "12345678",
    },
    {
        name: "eldor", email: "", password: "1234567"
    },
    {
        name: "eldor", email: "eldor9012545@gmail.com", password: ""
    },
    {
        name: "eldor", email: "eldor@gmail.com", password: "1234"
    },
    {
        name: "", email: "eldor", password: "1234"
    }
];

