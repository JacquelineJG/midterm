const express = require('express');
const router  = express.Router();
const { myTiles } = require('../database');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    const my = req.session.userId;
    database.myTiles(my)
    .then(my => {
      // if (!category) {
      //   return res.status(400).json({
      //     status: 'error',
      //     error: 'req body cannot be empty',
      //   });
      // }
      const templateVars = {
        tiles: my
      };
      console.log(`tv: ${JSON.stringify(templateVars)}`);
      return res.render("tiles", templateVars);
    })
    .catch(e => {
      console.log("error")
      return res.send(e)
    })
    });

return router;
};
