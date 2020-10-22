const express = require('express');
const router  = express.Router();
const { createComment } = require('../database');
const { getUserWithId } = require('../database');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {

  router.post("/", (req, res) => {
    const comments = req.body;
    const user_id = req.session.userId;
    console.log(`rb: ${JSON.stringify(req.body)}`);
    console.log(`comment.js: ${req.body.id} `)
    database.createComment(comments, user_id)
  .then(comments => {
    if (!comments) {
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
