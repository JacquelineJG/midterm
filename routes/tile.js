const express = require('express');
const router  = express.Router();
const { getTile, getRating } = require('../database');
const { getUserWithId } = require('../database');
const { getComments } = require('../database');

module.exports = function(router, database) {
    router.get("/:id", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const tileId = req.params.id;
      const userId = req.session.userId;

      Promise.all([database.getTile(tileId), database.getUserWithId(userId), getComments(tileId), getRating(tileId)])
        .then(all => {
          const tile = all[0];
          const user = all[1];
          const comments = all[2];
          const ratings = all[3];
          const templateVars = {
            tile: tile,
            user: user,
            comments: comments,
            ratings: ratings
          };
          res.render("tile", templateVars);
        })
    });
return router;
};
