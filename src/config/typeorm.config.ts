import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig:TypeOrmModule =  {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'eldor901',
    database: 'db_omega',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};