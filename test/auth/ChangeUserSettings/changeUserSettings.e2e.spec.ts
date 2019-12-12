import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {jwtToben, jwtToken2} from "../Constants";
import {UpdateExistingLogin} from "../UpdateUser/updateUser.conf";
import {UserTypeChange, UserTypeForbitChange} from "./changeUserSetting.conf";




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


    describe('Update User Settings', function () {
        it(`Change User Type Moderator`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({Authorization: jwtToben.token})
                .send(UserTypeChange[0])
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('userId');
                })
        });
    });

    describe('Update User Settings', function () {
        it(`Change User Type Admin`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({Authorization: jwtToben.token})
                .send(UserTypeChange[1])
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('userId');
                })
        });
    });


    describe('Update User Settings', function () {
        it(`Forbit change User Type`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({Authorization: jwtToken2.token})
                .send(UserTypeChange[1])
                .expect(400)
                .then(response => {
                    expect(response.body).toHaveProperty('error');
                })
        });
    });


    describe('Update User Settings', function () {
        it(`Forbit change User Type. User Type doesnt exists`, () => {
            return  request(app.getHttpServer())
                .put('/auth/updateUserSettings')
                .set({Authorization: jwtToben.token})
                .send(UserTypeForbitChange[1])
                .expect(400)
                .then(response => {
                    expect(response.body).toHaveProperty('error');
                    expect(response.body).toHaveProperty('message');
                })
        });
    });



    afterAll(async () => {
        await app.close();
    });
});