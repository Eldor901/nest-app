import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    UserRegisterTestForbit,
    UserRegisterTestSucces,
} from "../RegisterUser/register.conf";
import {ForbitAcess} from "../LoginUser/auth.conf";
import {ChangeUserPassword, ForbitUserChangePassword} from "./resetPassword";
import {jwtToben} from "../Constants";



describe('User/ResetPassword', () => {
    let app: INestApplication;
    let AuthService = { register: () => ['test']};

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
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
            return  request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({Authorization: jwtToben.token})
                .send(ChangeUserPassword[0])
                .expect(200)
                .then(response => {
                   expect(response.body).toHaveProperty('userId');
                })
        });
    });

    describe('Update User Password', function () {
        it(`user forbit. Unknown user`, () => {
            return  request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({Authorization: jwtToben.token + 'a'})
                .send(ChangeUserPassword[0])
                .expect(401)
                .then(response => {
                    expect(response.body).toHaveProperty('error');
                })
        });
    });


    describe('Update User Password', function () {
        it(`user forbit . password exception`, () => {
            return  request(app.getHttpServer())
                .put('/auth/resetPassword')
                .set({Authorization: jwtToben.token})
                .send(ForbitUserChangePassword[0])
                .expect(400)
                .then(response => {
                    expect(response.body).toHaveProperty('message');
                    expect(response.body).toHaveProperty('error');
                })
        });
    });


    afterAll(async () => {
        await app.close();
    });
});