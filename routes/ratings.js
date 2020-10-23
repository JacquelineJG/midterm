const express = require('express');
const router  = express.Router();
const { createRating } = require('../database');
const cookieSession = require('cookie-session');

// Receives a user's rating on a tile, adds it to the database, and returns the tile info with the updated rating

module.exports = function(router, database) {
  router.post("/", (req, res) => {
    const rating = req.body;
    const user_id = req.session.userId;

    database.createRating(rating, user_id)
  .then(rating => {
    if (!rating) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
    return res.redirect(`tile/${req.body.tile_id}`);
  })
  .catch(e => {
    return res.send(e)
  });
});
return router;
};
