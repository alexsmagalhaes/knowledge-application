const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig);

async function runMigrations() {
  try {
    await db.migrate.latest();
    console.log("Migrations succeed!");
  } catch (error) {
    console.error("Migrations failed!", error);
  }
}

runMigrations();

module.exports = db;
