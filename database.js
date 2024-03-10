const mongoose = require("mongoose");

const env = require("env2")("./.env");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        // "mongodb+srv://noporpuse:uMH6gxIbZEGZ4HbW@twitterclonecluster.gruveee.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority"
        process.env.DB_URL
      )
      .then(() => {
        console.log("database connected...");
      })
      .catch((err) => {
        console.log("database connection error" + err);
      });
  }
}

module.exports = new Database();
