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

const getUserWithEmail = function(email) {

  const queryString = `
  SELECT * FROM users
  WHERE email LIKE $1;
  `;

  const values = [`%${email}%`];

  return pool.query(queryString, values)
  .then(res => res.rows[0]);


}
exports.getUserWithEmail = getUserWithEmail;

const updateProfile = function(user) {

  console.log(`userid: ${JSON.stringify(user)}`);
  const queryString = `
  UPDATE users
  SET name = $1, email = $2, password = $3
  WHERE id = 36
  RETURNING *
  `;

  return pool.query(queryString, [user.name, user.email, user.password])
  .then(res => {
    console.log(`res: ${JSON.stringify(res)}`)
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.updateProfile = updateProfile;
