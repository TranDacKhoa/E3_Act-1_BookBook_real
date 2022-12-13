const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = new Sequelize("db_bookbook", "postgres", "1", {
  host: "localhost",
  dialect: "postgres",
});
// const test = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };
module.exports = {
  sequelize,
  models: initModels(sequelize),
};
