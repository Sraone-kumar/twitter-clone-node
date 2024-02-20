const express = require("express");

const app = express();

const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", async (req, res, next) => {
  const payload = req.body;
  if (req.body.logUserName.trim() && req.body.logPassword) {
    console.log(req.body);
    const user = await User.findOne({
      $or: [
        { username: req.body.logUserName },
        { email: req.body.logUserName },
      ],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "something went wrong";
      res.status(200).render("login", payload);
    });

    console.log(user);

    if (user != null) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        //login user
        req.session.user = user;
        return res.redirect("/");
      }
    } else {
      //send back incorrect or username password
      payload.errorMessage = "username or password incorrect";
      return res.status(200).render("login", payload);
    }
  }

  payload.errorMessage = "Make sure each field has a valid value";
  return res.status(200).render("login", payload);
});

module.exports = router;
