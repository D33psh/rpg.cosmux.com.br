describe("[GET] /api/v1/status", () => {
  it("should be return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    const persedUpdatedAt = new Date(responseBody.updated_at).toISOString();

    expect(responseBody.updated_at).toEqual(persedUpdatedAt);
    expect(responseBody.dependencies.database.version).toBe("16.0");
    expect(responseBody.dependencies.database.max_connections).toBe(100);
    expect(responseBody.dependencies.database.opened_conncetions).toBe(1);
  });
});
