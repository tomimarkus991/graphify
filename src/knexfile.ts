import { Knex } from "knex";
const connection = process.env.DATABASE_URL;

const pool = {
  min: 2,
  max: 10,
};

interface KnexConfig {
  [key: string]: Knex.Config;
}

export default {
  development: {
    client: "pg",
    connection,
    pool,
    migrations: {
      extension: "ts",
      directory: "./db/migrations",
    },
    seeds: {
      extension: "ts",
      directory: "./db/seeds",
    },
  },
  production: {
    client: "pg",
    connection,
    pool,
    migrations: {
      extension: "ts",
      directory: "./db/migrations",
    },
    seeds: {
      extension: "ts",
      directory: "./db/seeds",
    },
  },
  test: {
    client: "pg",
    connection,
    pool,
    migrations: {
      extension: "ts",
      directory: "./db/migrations",
    },
    // Separate directory for test seeds to not conflict with development seeds
    seeds: {
      extension: "ts",
      directory: "./../test/seeds",
    },
  },
} as KnexConfig;
