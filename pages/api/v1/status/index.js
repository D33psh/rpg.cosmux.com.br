// import { database } from "../../../../infra/database";

import { database } from "../../../../infra/database";

export default async function Status(request, response) {
  const updated_at = new Date();

  const queryVersion = await database.query("SHOW server_version;");
  const version = queryVersion.rows[0].server_version;

  const queryMaxConnections = await database.query("SHOW max_connections;");
  const max_connections = Number(queryMaxConnections.rows[0].max_connections);

  const queryOpenedConnections = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1",
    values: ["localdb"],
  });
  const opened_conncetions = Number(queryOpenedConnections.rows[0].count);

  return response.status(200).json({
    updated_at,
    dependencies: {
      database: {
        version,
        max_connections,
        opened_conncetions,
      },
    },
  });
}
