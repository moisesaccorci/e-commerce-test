import { Sequelize } from "sequelize";
import { development } from '../../config/configTest.js'
export const sequelize = new Sequelize({
    dialect:'postgres',
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
})