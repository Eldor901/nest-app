import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthModule} from "../../src/auth/auth.module";
import {typeOrmConfig} from "../../src/config/typeorm.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    UserRegister,
    userRegister1,
    userRegister2,
    userRegister3,
    userRegister4,
    userRegister5, userRegister6
} from "./Conf/register.conf";


const oneColumnCheck: number = 1;
const twoColumnCheck: number = 2;
const threeCoulumnCheck: number = 3;


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
/*
    it(`/post User colums fully filled out`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister1)
            .expect(201)
    });

*/
    it(`/post User test with empty name column`, () => {

        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister2)
            .expect(400)
            .then(response => {
                    expect(response.body.message[0].
                        constraints.isNotEmpty).toEqual("name should not be empty");
            })

    });

    it(`/post User test with empty email column`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister3)
            .expect(400)
            .then(response => {
                expect(response.body.message[0].
                    constraints.isEmail).toEqual("Email is Invalid");
            })

    });


    it(`/post User test with empty password column`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister4)
            .expect(400)
            .then(response => {
                expect(response.body.message[0].
                    constraints.isNotEmpty).toEqual("password should not be empty");
            })

    });


    it(`/post User test with  at least 6 character in password column`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister5)
            .expect(400)
            .then(response => {

                expect(response.body.message[0].
                    constraints.minLength).toEqual("Your password should contain at least 6 character");
            })

    });


    it(`/All column check empty, at least6 character, not valid email`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister6)
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


    it(`/post registered  User`, () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userRegister1)
            .expect(500)
    });

    afterAll(async () => {
        await app.close();
    });
});