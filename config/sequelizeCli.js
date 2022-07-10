module.exports = {
    development: {
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
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            userId: 'user_id'
          },
    }
}