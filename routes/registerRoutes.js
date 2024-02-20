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
  res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
  //   console.log(req.body);
  let firstName = req.body.firstName.trim();
  //   console.log(firstName);
  let lastName = req.body.lastName.trim();
  //   console.log(lastName);
  let userName = req.body.username.trim();
  //   console.log(userName);
  let email = req.body.email.trim();
  //   console.log(email);
  let password = req.body.password;
  let payload = req.body;

  if (firstName && lastName && userName && email && password) {
    const user = await User.findOne({
      $or: [{ username: userName }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong, try again later";
      res.status(200).render("register", payload);
    });

    if (user == null) {
      //No user found

      let data = req.body;
      data.password = await bcrypt.hash(password, 10);
      //   console.log(data);
      User.create(data).then((user) => {
        console.log("user inserted");
        console.log(user);
        req.session.user = user;
        return res.redirect("/");
      });
    } else {
      //User found
      if (email == user.email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use";
      }
      res.status(200).render("register", payload);
    }
  } else {
    payload.errorMessage = "Make sure fields not empty!";
    res.status(200).render("register", payload);
  }
});

module.exports = router;
