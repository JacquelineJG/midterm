const express = require('express');
const router  = express.Router();
const { searchCategory } = require('../database');
const { getUserWithId } = require('../database');

module.exports = function(router, database) {

    router.get("/", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const category = req.query.type;
      const userId = req.session.userId;

      Promise.all([database.searchCategory(category), database.getUserWithId(userId)])
        .then(all => {
          console.log(`0 ${JSON.stringify(all[0])}`);
          console.log(`1: ${JSON.stringify(all[1])}`);
          const category = all[0];
          const user = all[1];
          const templateVars = {
            tiles: category,
            user: user
          };
          console.log(`tv: ${JSON.stringify(templateVars)}`);
          res.render("results", templateVars);
        })
    });

return router;
};
