const Sequelize = require("sequelize");
const ApiError = require("../classes/api-errors");
require("dotenv").config()

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    timezone: "-03:00",
    define: {
      hooks: {
        afterFind(result) {
          if (!result) throw new ApiError("Dado não encontrado", 404);
        },
      },
      timestamps: false
    }
})
  
  module.exports = connection;