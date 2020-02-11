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


// API function checks
const { restaurant } = require('./planning/yelpLibrary');
const { book } = require('./planning/booksLibrary');
const { movie } = require('./planning/movieLibrary');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['/*gjugjugjuju secret keys */'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

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
};

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   let userId = req.session.userId;
//   if (userId) {
//     let tempVars = {
//       'user': userId
//     };
//     res.render("index", tempVars);
//   } else {
//     res.send("Not Logged In");
//   }
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Gets

// app.get('/login/:id', (req, res) => {
//   const userId = req.params.id;
//   req.session.userId = userId;
//   res.redirect('/');
// });


// const getTaskCategory = (taskTitle) => {
//   return 'books';
// };

// const getTasksOfUser = (userId) => {
//   const userTasks = [];
//   for (let task in tasks) {
//     if  (task.userId === userId) {
//       tasks.push(task);
//     }
//   } m
//   return userTasks;
// };

// app.get("/tasks", (req, res) => {
//   const userId = req.session.userId;
//   if (userId) {
//     const userTasks = getTasksOfUser(userId);
//     let tempVars = {
//       'user': userId
//     };
//     res.render("index", tempVars);
//   } else {
//     res.send("Not Logged In");
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



// Categorizes the task.  Promise.all returns an arrive of defined values.
const getCategory = (task) => {

  return Promise.all([restaurant(task), book(task), movie(task)])
  .then((results) => {
    console.log('getCat results:', results)
    if (results[0]) {
      return 'restaurants'
    }
    if (results[2]) {
      return 'movies'
    }
    if (results[1]) {
      return 'books'
    }
    return 'products'
  })

}

app.post('/todos', (req, res) => {
  // console.log(req.body.task)
  // console.log(getCategory(req.body.task))

  getCategory(req.body.task).then(data => {
    console.log(data)
    res.send(data)
  }) // it sends the first result that returns true

})

app.get('/', (req,res) => {
  res.render('index')
})
