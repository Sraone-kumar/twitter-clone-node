const express = require("express");
const { join } = require("path");
const app = express();

const PORT = 3000;

const middleware = require("./middleware");
const bodyParser = require("body-parser");

const mongoose = require("./database");
const session = require("express-session");

const server = app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));

app.use(
  session({
    secret: "helomyworld",
    resave: true,
    saveUninitialized: false,
  })
);

//Routes
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logout");

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "home",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("home", payload);
});
