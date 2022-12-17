const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = new Sequelize("db_bookbook", "postgres", "Sunrise1", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  sequelize,
  models: initModels(sequelize),
};
