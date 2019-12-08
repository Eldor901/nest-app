import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserRegisterTestSucces} from "../RegisterUser/register.conf";
import {AutheredUsersGiveAccsess} from "./auth.conf";
import {ForbitAcess} from "./auth.conf";


describe('User/Auth', () => {
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


    describe('Successful authorization ', function () {
        for(let i:number = 0; i < AutheredUsersGiveAccsess.length; i++) {

            it(`user at element ${i} registered`, () => {
                return  request(app.getHttpServer())
                    .post('/auth/login')
                    .send(AutheredUsersGiveAccsess[i])
                    .expect(201)
                    .then(response => {
                        expect(response.body).toHaveProperty('accessToken');
                        console.log(response.body.accessToken);
                    })
            });
        }
    });


    describe('Forbit  authorization', function () {
        it(`user forbit unknow user`, () => {
            return  request(app.getHttpServer())
                .post('/auth/login')
                .send(ForbitAcess[3])
                .expect(401)
                .then(response => {
                    expect(response.body.accessToken);
                    expect(response.body.message).toEqual("invalid email or password")
                })
        });
    });

    afterAll(async () => {
        await app.close();
    });
});