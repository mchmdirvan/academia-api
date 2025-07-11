import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

async function getSchools() {
  await client.connect();

  const result = await client.query("SELECT * FROM schools");
  const schools = result.rows;
  console.log({ schools });

  await client.end();
}

async function addSchools() {
  await client.connect();

  const result = await client.query(
    "INSERT INTO schools (name, npsn) VALUES ('SMAN 62 Jakarta', '2020');"
  );
  console.log({ result });

  const schools = result.rows;
  console.log({ schools });

  await client.end();
}

getSchools();
