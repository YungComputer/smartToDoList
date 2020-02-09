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

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// adding the cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// sample data 
const tasks = {
  "taskRandomID": {
    id: "userRandomID",
    title: "searching food",
    IsDone: true,
    category: "food"
  },
  "task2RandomID": {
    id: "user2RandomID",
    title: "searching books",
    IsDone: false,
    category: "books"
  },
  "task3RandomID": {
    id: "user3RandomID",
    title: "searching movies",
    IsDone: true,
    category: "movies"
  }
}

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Gets

// do this instead
app.get('/login/:id', (req, res) => {
  const user_id = req.cookies.user_id;
  res.redirect('/');
});

// app.get("/index", (req, res) => {
//   const task_id = req.cookes.task_id;
//   const task = tasks[task_id];
//   if (task) {
//     const tempVars = {
//       "task": task
//     };
//     res.render("index", tempVars);
//   } else {
//     res.redirect('/login');
//   }
// });
// app.get("/test", (req, res)=>{
//   console.log("we are in the test");
// })

// // added /index/:id
// app.get("/index/:id", (req, res) => {
//   res.render("index");
// });

// // added get /tasks/:id
// app.get("/tasks/:id", (req, res) => {
//   res.render("index");
// });


// // POSTS

// // added post/tasks
// app.post("/tasks", (req, res) => {
//   res.render("index");
// });

