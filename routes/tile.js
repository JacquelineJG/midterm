const express = require('express');
const router  = express.Router();
const { getTile } = require('../database');
const { getUserWithId } = require('../database');

module.exports = function(router, database) {
    router.get("/:id", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const tileId = req.params.id;
      console.log(req.params);
      const userId = req.session.userId;

      Promise.all([database.getTile(tileId), database.getUserWithId(userId)])
        .then(all => {
          console.log(`0 ${JSON.stringify(all[0])}`);
          console.log(`1: ${JSON.stringify(all[1])}`);
          const tile = all[0];
          const user = all[1];
          const templateVars = {
            tile: tile,
            user: user
          };
          console.log(`tv: ${JSON.stringify(templateVars)}`);
          res.render("tile", templateVars);
        })
    });
return router;
};
