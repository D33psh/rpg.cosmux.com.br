import { Client } from "pg";

async function query(queryObject) {
  let client = await getNewClient();

  try {
    const response = await client.query(queryObject);
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  await client.connect();
  return client;
}

export const database = {
  query,
  getNewClient,
};
