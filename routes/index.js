const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../database');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {
router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
console.log(`reqses: ${req.session.userId}`);

  const getUser =  function(userId) {
    console.log(`fcuserId: ${userId}`)
  return database.getUserWithId(userId)
  }

  const userId = req.session.userId;
  getUser(userId)
    .then(user => {
      console.log(`lastuserId: ${userId}`)
const templateVars = {
    user: user
  };
  res.render("index", templateVars);

  });
});

return router;
};
