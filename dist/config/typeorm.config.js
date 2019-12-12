"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const DB_CONF = config.get('db');
exports.typeOrmConfig = {
    type: DB_CONF.type,
    host: DB_CONF.host,
    port: DB_CONF.port,
    username: DB_CONF.username,
    password: DB_CONF.password,
    database: DB_CONF.databaseName,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map