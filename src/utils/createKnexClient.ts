import knex from "knex";

import KnexConfig from "../knexfile";

export const knexClient = knex(KnexConfig[process.env.NODE_ENV || "development"]);
