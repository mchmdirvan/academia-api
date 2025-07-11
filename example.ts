import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const res = await client.query("SELECT * FROM schools");

const schools = res.rows;

console.log({ schools: schools });

await client.end();
