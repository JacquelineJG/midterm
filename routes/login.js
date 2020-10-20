const express = require('express');
const router  = express.Router();
const { getUserWithEmail } = require('../database');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    res.render("login");
    });

const login =  function(email, password) {
  return database.getUserWithEmail(email)

  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {

      return user;
    }
    return null;
  });
}
exports.login = login;

router.post('/', (req, res) => {
  console.log(req.body);
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      console.log(email);
      console.log(password);
      if (!user) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }
      currentUser = user;
      req.session.userId = user.id;
      console.log("yoyoyo");
      return res.redirect("/");
    })
    .catch(e => {
      console.log("gello")
      res.send(e)
    })
});

return router;
}



