module.exports = {
    development: {
        dialect:'postgres',
        host: process.env.HOST,
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false // <<<<<<< YOU NEED THIS
              }
          },
        port: '5432',
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASS,
    },
    tests: {
        dialect:'postgres',
        host: process.env.HOST,
        port: '5432',
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASS
    }
}