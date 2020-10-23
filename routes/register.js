const express = require('express');
const router  = express.Router();
const { addUser } = require('../database');
const bcrypt = require('bcrypt');

// Adds a new user into the database, encrypting its password in the process

module.exports = (router, database) => {
  router.get("/", (req, res) => {
  res.render("register");
  });
  router.post("/", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
  .then(user => {
    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
    currentUser = user;
    req.session.userId = user.id;
    return res.redirect("/");
  })
  .catch(e => {
    return res.send(e)
  });

});
return router;
};


