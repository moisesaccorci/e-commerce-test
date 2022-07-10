module.exports = {
    prod: {
        dialect:'postgres',
        host: process.env.HOST,
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false //
              }
          },
        port: '5432',
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASS,
    },
    development: {
        dialect:'postgres',
        host: 'localhost',
        port: '5432',
        database: 'ts-prototype-dev',
        username: 'ts-prototype',
        password: 'ts-prototype'
    }
}