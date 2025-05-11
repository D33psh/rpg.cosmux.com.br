import { database } from "../../../../../infra/database";

describe("[GET] /api/v1/migrations", () => {
  beforeAll(async () => {
    await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
  });

  it("should be returned 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toEqual(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
