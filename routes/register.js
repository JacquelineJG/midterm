const express = require('express');
const router  = express.Router();
const { addUser } = require('../database');


module.exports = (router, database) => {
  router.get("/", (req, res) => {
  res.render("register");
  });
  router.post("/", (req, res) => {
    const user = req.body;
    database.addUser(user)
  .then(user => {
    if (!user) {
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


