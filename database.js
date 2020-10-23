const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

//adds user to the database with username, user email, password as variables
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

//grab user where the email is like variable
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

//update profile where user id matches req session
const updateProfile = function(user) {

  const queryString = `
  UPDATE users
  SET name = $1, email = $2, password = $3
  WHERE id = $4
  RETURNING *
  `;

  return pool.query(queryString, [user.name, user.email, user.password, user.id])
  .then(res => {
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.updateProfile = updateProfile;

//get user by id query
const getUserWithId = function(userId) {

  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  const values = [`${userId}`];
  return pool.query(queryString, values)
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;

//populate tiles and order by id desc
const populateTiles = function() {
  const queryString = `
  SELECT * FROM tiles
  ORDER BY id DESC;
  `;
  return pool.query(queryString)
  .then(res => {
    if (res.rows.length){
      return res.rows;
    } else {
      console.log(`null`)
      return null;
    }
  });
}
exports.populateTiles = populateTiles;

//creates tile and inserts into db
const createTile = function(tiles) {
  const queryString = `
  INSERT INTO tiles (title, description, thumbnail_photo_url, url, category, user_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;

  return pool.query(queryString, [tiles.title, tiles.description, tiles.thumbnail_photo_url, tiles.url, tiles.category, tiles.user_id])
  .then(res => {
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.createTile = createTile;

//search category functionality, creates db query based on search category
const searchCategory = function(category) {
    let queryString = `
    SELECT *
    FROM tiles
    `;
    if (category == 'compsci') {
      queryString += `WHERE category='compsci'`;
    } else if (category == 'arts') {
      queryString += `WHERE category='arts'`;
     } else if (category == 'language') {
      queryString += `WHERE category='language'`;
     } else if (category == 'math') {
     queryString += `WHERE category='math'`;
     } else if (category == 'personal') {
      queryString += `WHERE category='personal'`;
     } else if (category == 'science') {
      queryString += `WHERE category='science'`;
     } else if (category == 'socsci') {
      queryString += `WHERE category='socsci'`;
     } else if (category == 'sean') {
      queryString += `WHERE category='sean'`;
     }
    queryString += `ORDER BY id DESC;`

     return pool.query(queryString)
     .then(res => {
       return res.rows;
     });
   }
exports.searchCategory = searchCategory;

//selects tiles where the user id associated with the tile table is equal to the current user req sess
const myTiles = function(my) {
let queryString = `
  SELECT *
  FROM tiles
  WHERE user_id = $1;
  `;

  const values = [`${my}`];

  return pool.query(queryString, values)
  .then(res => {
    return res.rows
  });
}
  exports.myTiles = myTiles;

// selects tiles by the id of the user id matching likes and tiles
const myLikes = function(my) {
  let queryString = `
    SELECT tiles.*
    FROM tiles
    JOIN likes ON tiles.id = likes.tile_id
    WHERE likes.user_id = $1
    `;
  const values = [`${my}`];
  return pool.query(queryString, values)
  .then(res => {
    return res.rows
  });
}
exports.myLikes = myLikes;

//get tile by id
const getTile = function(tileId) {
  let queryString = `
    SELECT *
    FROM tiles
    WHERE id = $1
    `;

  const values = [`${tileId}`];
  return pool.query(queryString, values)
  .then(res => {
    return res.rows[0]
  });
}
exports.getTile = getTile;

//create a comment in the db
const createComment = function(comments, user_id) {
  const queryString = `
  INSERT INTO comments (comment, user_id, tile_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return pool.query(queryString, [`${comments.text}`, user_id, comments.tile_id])
  .then(res => {
    if (res.rows.length){
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.createComment = createComment;

//get comments from the db matching user id
const getComments = function(tileId) {
  const queryString = `
  SELECT comments.comment, users.name
  FROM comments
  JOIN users ON user_id=users.id
  WHERE comments.tile_id=$1;
  `;

  const values = [`${tileId}`];
  return pool.query(queryString, values)
  .then(res => {
    if (res.rows.length){
      return res.rows;
    } else {
      console.log(`null`)
      return null;
    }
  });
}
exports.getComments = getComments;

//create a rating in the db
const createRating = function(rating, user_id) {
  const queryString = `
  INSERT INTO ratings (rating, user_id, tile_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return pool.query(queryString, [rating.rate, user_id, rating.tile_id])
  .then(res => {
    if (res.rows.length){
      console.log(`resrowscreaterating ${JSON.stringify(res.rows)}`);
      return res.rows[0];
    } else {
      return null;
    }
  });
}
exports.createRating = createRating;

//get a rating from the db
const getRating = function(tileId) {
  const queryString = `
  SELECT round(avg(rating), 1)
  FROM ratings
  WHERE tile_id=$1;
  `;

  const values = [`${tileId}`];
  return pool.query(queryString, values)
  .then(res => {
    if (res.rows.length){
      return res.rows;
    } else {
      return null;
    }
  });
}
exports.getRating = getRating;

//create likes in the db
const createLikes = function(likes, user_id, tile_id) {
  const queryString = `
  INSERT INTO likes (is_like, user_id, tile_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  return pool.query(queryString, [likes, user_id, tile_id])
  .then(res => {
    if (res.rows.length){
      return res.rows;
    } else {
      return null;
    }
  });
}
exports.createLikes = createLikes;
