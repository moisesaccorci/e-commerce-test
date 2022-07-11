import { Sequelize } from "sequelize";
export const sequelize = new Sequelize({
    // dialect:'postgres',
    // "dialectOptions": {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //       }
    //   },
    // host: process.env.HOST,
    // port: '5432',
    // database: process.env.DATABASE,
    // username: process.env.USERNAME,
    // password: process.env.PASS,
    // define: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at',
    //     deletedAt: 'deleted_at',
    //   },
    dialect: 'postgres',
    host: 'localhost',
    database: 'ts_prototype_dev',
    username: 'ts_prototype',
    password: 'ts_prototype',
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    }
})