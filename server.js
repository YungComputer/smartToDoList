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
const { restaurant } = require('./apis/yelpLibrary');
const { book } = require('./apis/booksLibrary');
const { movie } = require('./apis/movieLibrary');

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
    category: "food",
    userId: 1
  },
  "task2RandomID": {
    id: "user2RandomID",
    title: "searching books",
    IsDone: false,
    category: "books",
    userId: 2
  },
  "task3RandomID": {
    id: "user3RandomID",
    title: "searching movies",
    IsDone: true,
    category: "movies",
    userId: 3
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

app.get('/login/:id', (req, res) => {
  const userId = req.params.id;
  req.session.userId = userId;
  res.redirect('/');
});

const getTasksOfUser = (userId) => {
  userId = Number(userId);
  const userTasks = [];
  for (let taskId in tasks) {
    const task = tasks[taskId];
    if (task.userId === userId) {
      userTasks.push(task);
    }
  }
  return userTasks;
};

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


// testing that it returns json object
app.get("/tasksAsJson", (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const userTasks = getTasksOfUser(userId);
    res.json(userTasks);
    // res.json(userTasks); ????
  } else {
    res.send("Not Logged In");
  }
});


// Categorizes the task.  Promise.all returns an arrive of defined values.
const getCategory = (task) => {

  return Promise.all([restaurant(task), book(task), movie(task)])
  .then((results) => {
    // console.log('getCat results:', results)
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

// POST /todos
app.post('/todos', (req, res) => {
  const taskTitle = req.body.text;
  const userId = Number(req.session.userId);

  getCategory(taskTitle).then(category => {
    // todo: to be replaced with database call
    // const taskId = 6 // need to user random generator
    const taskId = Math.floor(Math.random() * 1000000);
    tasks[taskId] = {
      id: taskId,
      title: taskTitle,
      IsDone: false,
      "category": category,
      "userId": userId
    }
    res.send(category)
  });

});




app.get('/', (req,res) => {
  res.render('index')
})
