"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const updateUser_conf_1 = require("./updateUser.conf");
const Constants_1 = require("../Constants");
describe('User/ResetPassword', () => {
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
    describe('Update User', function () {
        it(`updateExsitingUser`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(updateUser_conf_1.UpdateExistingLogin[0])
                .expect(200)
                .then(response => {
                expect(response.body).toHaveProperty('userId');
            });
        });
    });
    describe('Update User', function () {
        it(`unknown User`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({ Authorization: Constants_1.jwtToben.token + "a" })
                .send(updateUser_conf_1.UpdateExistingLogin[1])
                .expect(401)
                .then(response => {
                expect(response.body).toHaveProperty('error');
            });
        });
    });
    describe('Update User', function () {
        it(`Exaption Error password `, () => {
            return request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(updateUser_conf_1.ForbitUpdating[0])
                .expect(400)
                .then(response => {
                expect(response.body).toHaveProperty('message');
                expect(response.body).toHaveProperty('error');
            });
        });
    });
    describe('Update User', function () {
        it(`Exaption Error password, name`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(updateUser_conf_1.ForbitUpdating[1])
                .expect(400)
                .then(response => {
                expect(response.body).toHaveProperty('message');
                expect(response.body).toHaveProperty('error');
            });
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=updateUser-e2e.spec.js.map