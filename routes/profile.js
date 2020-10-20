const express = require('express');
const router  = express.Router();
const { updateProfile } = require('../database');

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    console.log(database)
    const templateVars = {
      user: currentUser
    };
    res.render("profile", templateVars);
    });

    router.post("/", (req, res) => {
      const user = req.body;
      console.log(`I AM THE USER: ${JSON.stringify(user)}`);
      console.log(`I AM THE USER2: ${JSON.stringify(user)}`);
      console.log(`I AM THE USER3: ${req.body.name}`);
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
}
