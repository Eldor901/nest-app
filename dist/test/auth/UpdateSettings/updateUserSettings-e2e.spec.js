"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const register_conf_1 = require("../RegisterUser/register.conf");
const userSettings_conf_1 = require("./userSettings.conf");
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
    describe('Should change User_type RegisterUser', function () {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsZG9yOTAxMjU0NUBnbWFpbC5jb20iLCJuYW1lIjoiZWxkb3IiLCJpYXQiOjE1NzU1NTU4NzksImV4cCI6MTU3NTU1NjQ3OX0.-tSCizPTT3Ado-LcGF5Y6Xmb2aGSE6BnKUdE6_lkE1I';
        for (let i = 0; i < register_conf_1.UserRegisterTestSucces.length; i++) {
            it(`user at element ${i} user_type changed`, () => {
                return request(app.getHttpServer())
                    .put('auth//updateusersettings')
                    .set({ Authorization: token })
                    .send(userSettings_conf_1.UserTypeChange[i])
                    .expect(200)
                    .then(response => {
                    expect(response.body).toHaveProperty('userId');
                });
            });
        }
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=updateUserSettings-e2e.spec.js.map