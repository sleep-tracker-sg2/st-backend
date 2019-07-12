// Update with your config settings.
const dbConnection = process.env.DATABASE_URL

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/sleep_production.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './database/sleep_test.db3',
    },  
   useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      tableName: 'knex_migrations',
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
}