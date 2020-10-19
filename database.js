const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const addUser = function(user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `
  return pool.query(queryString, [user.name, user.email, user.password])
  .then(res => {
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.addUser = addUser;
