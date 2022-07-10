import { Sequelize } from "sequelize";

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
})