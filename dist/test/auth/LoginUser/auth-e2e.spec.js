"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_conf_1 = require("./auth.conf");
const auth_conf_2 = require("./auth.conf");
describe('User/Auth', () => {
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
    describe('Successful authorization ', function () {
        for (let i = 0; i < auth_conf_1.AutheredUsersGiveAccsess.length; i++) {
            it(`user at element ${i} logged in`, () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send(auth_conf_1.AutheredUsersGiveAccsess[i])
                    .expect(201)
                    .then(response => {
                    expect(response.body).toHaveProperty('accessToken');
                });
            });
        }
    });
    describe('Forbit  authorization', function () {
        it(`user forbit unknow user`, () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send(auth_conf_2.ForbitAcess[3])
                .expect(401)
                .then(response => {
                expect(response.body.accessToken);
                expect(response.body.message).toEqual("invalid email or password");
            });
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=auth-e2e.spec.js.map