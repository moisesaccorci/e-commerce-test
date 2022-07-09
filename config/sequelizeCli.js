module.exports = {
    development: {
        dialect:'postgres',
        host: 'localhost',
        port: '5432',
        database: 'ts-prototype_dev',
        username: 'ts-prototype',
        password: 'ts-prototype'
    },
    production: {
        dialect:'postgres',
        host: process.env.HOST,
        port: '5432',
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASS
    }
}