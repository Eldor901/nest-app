import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ChangeUserPassword} from "../ResetPasswordUser/resetPassword";
import {UpdateExistingLogin} from "./updateUser.conf";




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
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsZG9yOTAxMjU0NUBnbWFpbC5jb20iLCJuYW1lIjoiZWxkb3IiLCJpYXQiOjE1NzU1NTU4NzksImV4cCI6MTU3NTU1NjQ3OX0.-tSCizPTT3Ado-LcGF5Y6Xmb2aGSE6BnKUdE6_lkE1I';
        it(`updateExsitingUser`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateuser')
                .set({Authorization: token})
                .send(UpdateExistingLogin[0])
                .expect(200)
                .then(response => {
                })
        });
    });


    afterAll(async () => {
        await app.close();
    });
});