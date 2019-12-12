"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("../../../src/auth/auth.module");
const typeorm_config_1 = require("../../../src/config/typeorm.config");
const typeorm_1 = require("@nestjs/typeorm");
const resetPassword_1 = require("./resetPassword");
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
    describe('Update User Password', function () {
        it(`changes Success`, () => {
            return request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(resetPassword_1.ChangeUserPassword[0])
                .expect(200)
                .then(response => {
                expect(response.body).toHaveProperty('userId');
            });
        });
    });
    describe('Update User Password', function () {
        it(`user forbit. Unknown user`, () => {
            return request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({ Authorization: Constants_1.jwtToben.token + 'a' })
                .send(resetPassword_1.ChangeUserPassword[0])
                .expect(401)
                .then(response => {
                expect(response.body).toHaveProperty('error');
            });
        });
    });
    describe('Update User Password', function () {
        it(`user forbit . password exception`, () => {
            return request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({ Authorization: Constants_1.jwtToben.token })
                .send(resetPassword_1.ForbitUserChangePassword[0])
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
//# sourceMappingURL=resetPassword-e2e.spec.js.map