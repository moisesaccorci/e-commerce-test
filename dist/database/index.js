"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    "dialectOptions": {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    host: process.env.HOST,
    port: '5432',
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASS,
    // dialect:'postgres',
    // host: 'localhost',
    // port: '5432',
    // database: 'ts-prototype-dev',
    // username: 'ts-prototype',
    // password: 'ts-prototype'
});
