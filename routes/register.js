const express = require('express');
const router  = express.Router();
const { addUser } = require('../database');


module.exports = (router, database) => {
  router.get("/", (req, res) => {
  res.render("register");
  });
  router.post("/", (req, res) => {
    const user = req.body;
  // const user = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  // console.log("user", user);
  database.addUser(user)
  .then(user => {
    if (!user) {
      console.log("hello world");
      res.send({error: "error"});
      return;
    }
    req.session.userId = user.id;
    console.log("UserId", req.session.userId);
    console.log("UserID", req.session.userID);
    res.send(":)");
  })
  .catch(e => {
    res.redirect("/");
    res.send(e) });

});
return router;
};


