import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ChangeUserPassword} from "../ResetPasswordUser/resetPassword";
import {ForbitUpdating, UpdateExistingLogin} from "./updateUser.conf";
import {ForbitAcess} from "../LoginUser/auth.conf";
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

    describe('Update User', function () {
        it(`updateExsitingUser`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({Authorization: jwtToben.token})
                .send(UpdateExistingLogin[0])
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('userId');
                })
        });
    });

    describe('Update User', function () {
        it(`unknown User`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({Authorization: jwtToben.token + "a"})
                .send(UpdateExistingLogin[1])
                .expect(401)
                .then(response => {
                    expect(response.body).toHaveProperty('error');
                })
        });
    });

    describe('Update User', function () {
        it(`Exaption Error password `, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({Authorization: jwtToben.token})
                .send(ForbitUpdating[0])
                .expect(400)
                .then(response => {
                    expect(response.body).toHaveProperty('message');
                    expect(response.body).toHaveProperty('error');
                })
        });
    });

    describe('Update User', function () {
        it(`Exaption Error password, name`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({Authorization: jwtToben.token})
                .send(ForbitUpdating[1])
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