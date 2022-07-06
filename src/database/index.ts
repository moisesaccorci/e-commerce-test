import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect:'postgres',
    host:'localhost',
    port: 5432,
    database: 'ts_prototype_dev',
    username: 'ts_prototype',
    password: 'ts_prototype',
    define: {
        underscored: true
    }
})