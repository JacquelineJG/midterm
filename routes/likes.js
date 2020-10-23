const express = require('express');
const router  = express.Router();
const { createLikes } = require('../database');
const { getUserWithId } = require('../database');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {

  router.post("/", (req, res) => {
    const likes = req.body.tile_id[0];
    const user_id = req.session.userId;
    const tile_id = req.body.tile_id[1];
    database.createLikes(likes, user_id, tile_id)
  .then(likes => {
    if (!likes) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
    return res.redirect(`tile/${req.body.tile_id[1]}`);
  })
  .catch(e => {
    return res.send(e)
  });
});
return router;
};
