const express = require('express');
const router  = express.Router();
const { myTiles } = require('../database');
const { getUserWithId } = require('../database');

module.exports = function(router, database) {
    router.get("/", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const my = req.session.userId;
      const userId = req.session.userId;

      Promise.all([database.myTiles(my), database.getUserWithId(userId)])
        .then(all => {
          console.log(`0 ${JSON.stringify(all[0])}`);
          console.log(`1: ${JSON.stringify(all[1])}`);
          const my = all[0];
          const user = all[1];
          const templateVars = {
            tiles: my,
            user: user
          };
          console.log(`tv: ${JSON.stringify(templateVars)}`);
          res.render("tiles", templateVars);
        })
    });
return router;
};