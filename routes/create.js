const express = require('express');
const router  = express.Router();
const { createTile } = require('../database');
const { getUserWithId } = require('../database');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {
  router.get("/", (req, res) => {

    //This function gathers the user data and creates a tile with given information

      const userId = req.session.userId;
      getUserWithId(userId)
        .then(user => {
    const templateVars = {
        user: user
      };
    return res.render("create", templateVars);
    });
});
  router.post("/", (req, res) => {
    const tiles = req.body;
    tiles.user_id = req.session.userId;
    database.createTile(tiles)
  .then(tiles => {
    if (!tiles) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
    return res.redirect("/");
  })
  .catch(e => {
    return res.send(e)
  });
});
return router;
};
