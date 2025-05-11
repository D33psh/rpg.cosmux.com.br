import MigrationRunner from "node-pg-migrate";
import { database } from "../infra/database.js";
import { join } from "path";

const defaultMigrationsOptions = {
  dir: join("infra", "migrations"),
  dryRun: true,
  direction: "up",
  migrationsTable: "pgmigrations",
  verbose: true,
};

async function list() {
  let pendingMigrations = await MigrationRunner({
    ...defaultMigrationsOptions,
    dbClient: await database.getNewClient(),
  });

  return pendingMigrations;
}

async function run() {
  const migratedMigrations = MigrationRunner({
    ...defaultMigrationsOptions,
    dbClient: await database.getNewClient(),
    dryRun: false,
  });

  return migratedMigrations;
}

export const migrations = {
  list,
  run,
};
