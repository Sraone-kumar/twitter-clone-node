const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        "mongodb+srv://noporpuse:uMH6gxIbZEGZ4HbW@twitterclonecluster.gruveee.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority"
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
