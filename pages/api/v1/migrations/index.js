import { migrations } from "../../../../models/migrator.js";

export default async function Migrations(request, response) {
  console.log(request.method);

  if (request.method === "GET") {
    const pendingMigrations = await migrations.list();

    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrations.run();

    console.log(migratedMigrations);

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }
}
