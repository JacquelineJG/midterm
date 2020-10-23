const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../database');
const { populateTiles } = require('../database');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

//This function redirects the index page to login page if user has not logged in or registered

module.exports = function(router, database) {
router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const userId = req.session.userId;

  //Populates tiles that have been created by users or gathered from database

  Promise.all([database.populateTiles(), database.getUserWithId(userId)])
    .then(all => {
      const tiles = all[0];
      const user = all[1];
      const templateVars = {
        user: user,
        tiles: tiles
      };
      res.render("index", templateVars);
    })
});
return router;
};
