import { Client } from "pg";
import { DbConfig, DB_CONFIG } from "./db.config";

export const dbClientProvider = {
  inject: [DB_CONFIG],
  provide: Client,
  useFactory: async ({ host, user, password, database, port }: DbConfig) => {
    const client = new Client({
      host,
      user,
      password,
      database,
      port,
    });

    await client.connect();

    return client;
  },
};
