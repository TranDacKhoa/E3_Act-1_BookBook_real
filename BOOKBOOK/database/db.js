const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = new Sequelize("db_bookbook", "postgres", "1", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  sequelize,
  models: initModels(sequelize),
};
