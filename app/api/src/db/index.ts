import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ApiError } from "../errors";
import * as schema from "./schema";

let connection: ReturnType<typeof postgres> | undefined;
let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDatabase() {
  if (database) return database;
  const url = process.env.DATABASE_URL;
  if (!url) throw new ApiError(503, "Koneksi database belum dikonfigurasi.");
  connection = postgres(url, { prepare: false, max: 5, connect_timeout: 10, idle_timeout: 20 });
  database = drizzle(connection, { schema });
  return database;
}

export async function closeDatabase() {
  await connection?.end({ timeout: 5 });
  connection = undefined;
  database = undefined;
}
