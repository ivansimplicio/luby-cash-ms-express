export = {
  type: process.env.DB_CONNECTION,
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
  entities: ['./src/models/**/*.ts'],
  migrations: ['./database/migrations/*.ts'],
  cli: {
    migrationsDir: './database/migrations/',
  },
};
