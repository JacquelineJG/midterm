const express = require('express');
const router  = express.Router();
const { searchCategory } = require('../database');
const { getUserWithId } = require('../database');

//Puts a tiles of a specified category and user info into a templateVars and renders

module.exports = function(router, database) {

    router.get("/", (req, res) => {
      if (!req.session.userId) {
        return res.redirect("/login");
      }
      const category = req.query.type;
      const userId = req.session.userId;

      Promise.all([database.searchCategory(category), database.getUserWithId(userId)])
        .then(all => {

          const category = all[0];
          const user = all[1];
          const templateVars = {
            tiles: category,
            user: user
          };

          res.render("results", templateVars);
        })
    });

return router;
};
