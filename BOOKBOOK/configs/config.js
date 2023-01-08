const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,

  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  // DB_PWD: process.env.DB_PWD,
  // DB_PWD: process.env.DB_PWD1,
  DB_PWD: process.env.DB_PWD2,

  SESSION_SECRETKEY: process.env.SESSION_SECRETKEY,
  COOKIE_MAXAGE: 1000 * 60 * 60 * 24 * 365,
};
