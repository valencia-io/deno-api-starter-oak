import {
  ClientMySQL,
  NessieConfig,
} from "https://deno.land/x/nessie@2.0.5/mod.ts";

import { config } from "./config/config.ts";

const conf = {
  hostname: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASS,
  // password: "pwd", // uncomment this line for <8
  db: config.DB_NAME,
};

const client = new ClientMySQL(conf);

/** This is the final config object */
const nessieConfig: NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default nessieConfig;
