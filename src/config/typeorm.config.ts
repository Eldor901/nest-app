import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

const DB_CONF = config.get('db');

export const typeOrmConfig:TypeOrmModule =  {
    type: DB_CONF.type,
    host: DB_CONF.host,
    port: DB_CONF.port,
    username: DB_CONF.username,
    password: DB_CONF.password,
    database: DB_CONF.databaseName,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};