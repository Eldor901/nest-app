"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'eldor901',
    database: 'db_omega',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map