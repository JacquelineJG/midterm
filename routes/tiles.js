const express = require('express');
const router  = express.Router();
const { myTiles } = require('../database');
const { myLikes } = require('../database');
const { getUserWithId } = require('../database');

//Puts a user's tiles, info, and likes into a templateVars and renders

module.exports = function(router, database) {
    router.get("/", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const my = req.session.userId;
      const userId = req.session.userId;

      Promise.all([database.myTiles(my), database.getUserWithId(userId), database.myLikes(my)])
        .then(all => {

          const my = all[0];
          const user = all[1];
          const likes = all[2];
          const templateVars = {
            myTiles: my,
            user: user,
            myLikes: likes
          };

          res.render("tiles", templateVars);
        })
    });
return router;
};
