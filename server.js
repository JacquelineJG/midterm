// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['apqr16-7acujhu-fj8ahfgk-jfujjka8', 'zxiuslojf-nsijwi98-dna1-2djkkand'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const register = require('./routes/register');
const login = require('./routes/login');
const profile = require('./routes/profile');
const index = require('./routes/index');
const logout = require('./routes/logout');
const createTile = require('./routes/create');
const database = require('./database');
const results = require('./routes/results');
const tiles = require('./routes/tiles');
const tile = require('./routes/tile');
const comment = require('./routes/comment');
const ratings = require('./routes/ratings');
const likes = require('./routes/likes');
const likesRouter = express.Router();
const registerRouter = express.Router();
const loginRouter = express.Router();
const profileRouter = express.Router();
const indexRouter = express.Router();
const tileRouter = express.Router();
const logoutRouter = express.Router();
const resultsRouter = express.Router();
const tilesRouter = express.Router();
const getTileRouter = express.Router();
const commentRouter = express.Router();
const ratingsRouter = express.Router();
//const loginRoutes = require('./routes/login');
// const registerRoutes = require("./routes/register");
//const searchRoutes = require('./routes/search');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
register(registerRouter, database);
app.use('/register', registerRouter);
login(loginRouter, database);
app.use('/login', loginRouter);
profile(profileRouter, database);
app.use('/profile', profileRouter);
index(indexRouter, database);
app.use('/', indexRouter);
logout(logoutRouter, database);
app.use('/logout', logoutRouter);
createTile(tileRouter, database);
app.use('/create', tileRouter);
results(resultsRouter, database);
app.use('/results', resultsRouter);
tiles(tilesRouter, database);
app.use('/tiles', tilesRouter);
tile(getTileRouter, database);
app.use('/tile', getTileRouter);
comment(commentRouter, database);
app.use('/comment', commentRouter);
ratings(ratingsRouter, database);
app.use('/ratings', ratingsRouter);
likes(likesRouter, database);
app.use('/likes', likesRouter);

//app.use('/login', loginRoutes(db));
// app.use('/register', registerRoutes(db));
//app.use('/search', searchRoutes(db));
// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
