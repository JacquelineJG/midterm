const express = require('express');
const router  = express.Router();
const { createRating } = require('../database');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {

  router.post("/", (req, res) => {
    const rating = req.body;
    const user_id = req.session.userId;
    console.log(`rb: ${JSON.stringify(req.body)}`);
    console.log(`comment.js: ${req.body.id} `)


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
