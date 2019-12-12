"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterTestSucces = [
    {
        name: "eldor", email: "eldor9012545@gmail.com", password: "12345678",
    },
    {
        name: "1jack", email: "jack1@gmail.com", password: "OneTwoThree",
    },
    {
        name: "Bob", email: "bob@gmail.com", password: "12345678",
    },
];
exports.UserRegisterTestForbit = [
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
//# sourceMappingURL=register.conf.js.map