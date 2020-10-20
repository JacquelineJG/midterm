const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {
router.post("/", (req, res) => {
  req.session.userId = null;
  res.redirect("/login");
});
return router;
}
