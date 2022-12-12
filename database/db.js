const pgp = require("pg-promise")();

const cn = {
  host: "localhost",
  port: 5432,
  database: "db_bookbook",
  user: "postgres",
  password: "1",
  max: 30, // use up to 30 connections
};
const db = pgp(cn);
exports.DB = db;
