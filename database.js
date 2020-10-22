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

const searchCategory = function(category) {
    let queryString = `
    SELECT *
    FROM tiles
    `;

     if (category == 'art') {
       queryString += `WHERE category='art' `;
     } else if (category == 'compsci') {
       queryString += `WHERE category='compsci'`;
     } else if (category == 'language') {
      queryString += `WHERE category='language'`;
     } else if (category == 'math') {
     queryString += `WHERE category='math'`;
     } else if (category == 'personal') {
      queryString += `WHERE category='personal'`;
     } else if (category == 'science') {
      queryString += `WHERE category='science'`;
     } else if (category == 'sosci') {
      queryString += `WHERE category='sosci'`;
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


const myTiles = function(my) {

console.log(`category: ${my}`);

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
      console.log(`resrowsgetrating ${JSON.stringify(res.rows)}`);
      return res.rows;
    } else {
      console.log(`null`)
      return null;
    }
  });
}
exports.getRating = getRating;


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
      console.log(`null`)
      return null;
    }
  });
}
exports.createLikes = createLikes;
