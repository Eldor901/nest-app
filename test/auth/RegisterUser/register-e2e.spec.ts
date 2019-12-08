import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../../src/auth/auth.module";
import {typeOrmConfig} from "../../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    UserRegisterTestForbit,
    UserRegisterTestSucces,
} from "./register.conf";



describe('User/Register', () => {
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

    describe('Should Successfully RegisterUser', function () {
        for(let i:number = 0; i < UserRegisterTestSucces.length; i++) {
            it(`user at element ${i} registered`, () => {
                   return  request(app.getHttpServer())
                    .post('/auth/RegisterUser')
                    .send(UserRegisterTestSucces[i])
                    .expect(201)
            });
        }
    });



    describe('Refistration failed', function () {

            it(`/post User test with empty name column`, () => {
                return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(UserRegisterTestForbit[0])
                .expect(400)
                .then(response => {
                    expect(response.body.message[0].
                        constraints.isNotEmpty).toEqual("name should not be empty");
                })
            });

            it(`/post User test with empty email column`, () => {
                return request(app.getHttpServer())
                    .post('/auth/RegisterUser')
                    .send(UserRegisterTestForbit[1])
                    .expect(400)
                    .then(response => {
                        expect(response.body.message[0].
                            constraints.isEmail).toEqual("Email is Invalid");
                    })

            });

            it(`/post User test with empty password column`, () => {
                return request(app.getHttpServer())
                    .post('/auth/RegisterUser')
                    .send(UserRegisterTestForbit[2])
                    .expect(400)
                    .then(response => {
                        expect(response.body.message[0].
                            constraints.isNotEmpty).toEqual("password should not be empty");
                    })
            });


        it(`/post User test with  at least 6 character in password column`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(UserRegisterTestForbit[3])
                .expect(400)
                .then(response => {
                    expect(response.body.message[0].
                        constraints.minLength).toEqual("Your password should contain at least 6 character");
                })

        });


        it(`/All column check: empty, at least6 character, not valid email`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(UserRegisterTestForbit[4])
                .expect(400)
                .then(response => {
                    expect(response.body.message[0].
                        constraints.isNotEmpty).toEqual("name should not be empty");
                    expect(response.body.message[1].
                        constraints.isEmail).toEqual("Email is Invalid");
                    expect(response.body.message[2].
                        constraints.minLength).toEqual("Your password should contain at least 6 character");
                })

        });

    });

    describe('Should Successfully RegisterUser', function () {
        it(`/post registered  User`, () => {
            return request(app.getHttpServer())
                .post('/auth/RegisterUser')
                .send(UserRegisterTestSucces[0])
                .expect(500)
        });
    });

    afterAll(async () => {
        await app.close();
    });
});