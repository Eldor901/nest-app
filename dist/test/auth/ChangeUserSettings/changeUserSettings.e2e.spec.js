"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const Constants_1 = require("../Constants");
const changeUserSetting_conf_1 = require("./changeUserSetting.conf");
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
    describe('Update User Settings', function () {
        it(`Change User Type Moderator`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(changeUserSetting_conf_1.UserTypeChange[0])
                .expect(200)
                .then(response => {
                expect(response.body).toHaveProperty('userId');
            });
        });
    });
    describe('Update User Settings', function () {
        it(`Change User Type Admin`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(changeUserSetting_conf_1.UserTypeChange[1])
                .expect(200)
                .then(response => {
                expect(response.body).toHaveProperty('userId');
            });
        });
    });
    describe('Update User Settings', function () {
        it(`Forbit change User Type`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({ Authorization: Constants_1.jwtToken2.token })
                .send(changeUserSetting_conf_1.UserTypeChange[1])
                .expect(400)
                .then(response => {
                expect(response.body).toHaveProperty('error');
            });
        });
    });
    describe('Update User Settings', function () {
        it(`Forbit change User Type. User Type doesnt exists`, () => {
            return request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(changeUserSetting_conf_1.UserTypeForbitChange[1])
                .expect(400)
                .then(response => {
                expect(response.body).toHaveProperty('error');
                expect(response.body).toHaveProperty('message');
            });
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=changeUserSettings.e2e.spec.js.map