export interface Login
{
    name: string;
    password: string;
}



export let UpdateExistingLogin: Login[]= [
    {
        name: "Eldor Ergashev", password: '12345678'
    },
    {
        name: "Eldor1", password: '12345678'
    },
];

export let ForbitUpdating: Login[]= [
    {
        name: "John",  password: 'some'
    },
    {
        name: "",  password: '1234'
    },
];