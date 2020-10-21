const express = require('express');
const router  = express.Router();
const { searchCategory } = require('../database');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    const category = req.query.type;
    database.searchCategory(category)
    .then(category=> {
      // if (!category) {
      //   return res.status(400).json({
      //     status: 'error',
      //     error: 'req body cannot be empty',
      //   });
      // }
      const templateVars = {
        tiles: category
      };
      console.log(`tv: ${JSON.stringify(templateVars)}`);
      return res.render("results", templateVars);
    })
    .catch(e => {
      console.log("error")
      return res.send(e)
    })
    });

return router;
};
