import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { closeDatabase, getDatabase } from "./index";

try {
  await migrate(getDatabase(), { migrationsFolder: fileURLToPath(new URL("../../drizzle", import.meta.url)) });
  console.log("Database migrations applied.");
} catch {
  console.error("Database migration failed. Check DATABASE_URL and the migration files.");
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
