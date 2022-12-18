const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const config = require("../configs/config");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PWD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    // console.log the db logging or not
    logging: false,
  }
);

module.exports = {
  sequelize,
  models: initModels(sequelize),
};
