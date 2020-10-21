const express = require('express');
const router  = express.Router();
const { createTile } = require('../database');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    return res.render("create");
});
  router.post("/", (req, res) => {
    const tiles = req.body;
    console.log(`reqbod:${JSON.stringify(req.body)}`);
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
