const express = require('express');
const router  = express.Router();
const { updateProfile } = require('../database');
const { getUserWithId } = require('../database');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    const getUser =  function(userId) {
    return database.getUserWithId(userId)
    }

    const userId = req.session.userId;
    getUser(userId)
      .then(user => {
  const templateVars = {
      user: user
    };
    res.render("profile", templateVars);
    });
  });

    router.post("/", (req, res) => {
      const user = req.body;
      database.updateProfile(user)
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
