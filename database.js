const mongoose = require("mongoose");

const env = require("env2")("./config.env");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("database connected...");
      })
      .catch((err) => {
        console.log("database connection error" + err);
      });
  }
}

module.exports = new Database();
