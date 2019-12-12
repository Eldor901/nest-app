"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const register_conf_1 = require("./register.conf");
describe('User/Register', () => {
    let app;
    let AuthService = { register: () => ['test'] };
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig), auth_module_1.AuthModule],
            providers: []
        })
            .overrideProvider(AuthService)
            .useValue(AuthService)
            .compile();
        app = module.createNestApplication();
        await app.init();
    });
    describe('Should Successfully RegisterUser', function () {
        for (let i = 0; i < register_conf_1.UserRegisterTestSucces.length; i++) {
            it(`user at element ${i} registered`, () => {
                return request(app.getHttpServer())
                    .post('/auth/RegisterUser')
                    .send(register_conf_1.UserRegisterTestSucces[i])
                    .expect(201)
                    .then(response => {
                    expect(response.body).toHaveProperty('userId');
                });
            });
        }
    });
    describe('Registration failed', function () {
        it(`/post User test with empty name column`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestForbit[0])
                .expect(400)
                .then(response => {
                expect(response.body.message[0].
                    constraints.isNotEmpty).toEqual("name should not be empty");
            });
        });
        it(`/post User test with empty email column`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestForbit[1])
                .expect(400)
                .then(response => {
                expect(response.body.message[0].
                    constraints.isEmail).toEqual("Email is Invalid");
            });
        });
        it(`/post User test with empty password column`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestForbit[2])
                .expect(400)
                .then(response => {
                expect(response.body.message[0].
                    constraints.isNotEmpty).toEqual("password should not be empty");
            });
        });
        it(`/post User test with  at least 6 character in password column`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestForbit[3])
                .expect(400)
                .then(response => {
                expect(response.body.message[0].
                    constraints.minLength).toEqual("Your password should contain at least 6 character");
            });
        });
        it(`/All column check: empty, at least6 character, not valid email`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestForbit[4])
                .expect(400)
                .then(response => {
                expect(response.body.message[0].
                    constraints.isNotEmpty).toEqual("name should not be empty");
                expect(response.body.message[1].
                    constraints.isEmail).toEqual("Email is Invalid");
                expect(response.body.message[2].
                    constraints.minLength).toEqual("Your password should contain at least 6 character");
            });
        });
    });
    describe('Successfully registered User ', function () {
        it(`/post registered  User`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(register_conf_1.UserRegisterTestSucces[0])
                .expect(500);
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=register-e2e.spec.js.map