const express = require("express");
const { join } = require("path");
const app = express();

const PORT = 3000;

const middleware = require("./middleware");

const server = app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.set("view engine", "pug");

app.set("views", "views");

app.use(express.static(join(__dirname, "public")));

//Routes
const loginRoutes = require("./routes/loginRoutes");

app.use("/login", loginRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "home",
  };
  res.status(200).render("home", payload);
});
