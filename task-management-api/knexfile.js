module.exports = {
    client: 'pg',  // Use PostgreSQL as the database client
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'task_manager',
      port: process.env.DB_PORT || 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  };

  