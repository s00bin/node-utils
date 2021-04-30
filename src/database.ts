import {Connection, ConnectionOptions, createConnection} from "typeorm";
import { env } from "./configs/env";
import path from "path";

export function createDatabaseConnection(): Promise<Connection> {
  try {
    const connectionOpts: ConnectionOptions = {
      type: "mysql",
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.name,
      synchronize: env.database.synchronize,
      logging: env.database.logging,
      entities: [path.join(__dirname, "/entities/*{.ts,.js}")],
      charset: "utf8mb4",
      dateStrings: true,
      // src/entity/**/ *.ts
      // TYPEORM_MIGRATIONS="src/migration/**/*.ts"
      // TYPEORM_SUBSCRIBERS="src/subscriber/**/*.ts"
    };

    return createConnection(connectionOpts);
  } catch (error) {
    throw error;
  }
}
