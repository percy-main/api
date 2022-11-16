import { Client } from "pg";
import { DbConfig, DB_CONFIG } from "./db.config";

export const dbClientProvider = {
  inject: [DB_CONFIG],
  provide: Client,
  useFactory: async ({ connectionString }: DbConfig) => {
    const client = new Client({
      connectionString,
    });

    await client.connect();

    return client;
  },
};
