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
const { dbParams, addTask, getAllTasks } = require('./lib/db.js');
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
const tasksRoutes = require("./routes/tasks");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/tasks", tasksRoutes(db));
// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Categorizes the task.  Promise.all returns an arrive of defined values.
const getCategory = (task) => {

  return Promise.all([restaurant(task), book(task), movie(task)])
  .then((results) => {
    // console.log('getCat results:', results)
    if (results[0]) {
      return 'restaurants'
    }
    if (results[1]) {
      return 'books'
    }
    if (results[2]) {
      return 'movies'
    }
    return 'products'
  });
};

// Gets the user login id
app.get('/login/:id', (req, res) => {
  console.log(req.session)
  console.log('HERE AT login:', req.session);

  const userId = req.params.id;
  req.session.userId = userId;
  res.redirect('/');

  getAllTasks(userId)
  .then((response) => {
    console.log('this is the response for getAllTasks:', response)
    // renderToDo(response.task_title, response.task_category)
    // res.send(response)
  })

  // Trying to figure out if this promise can work in here.

});

app.get('/tasks', (req, res) => {
  const userId = req.session.userId
  Pool.getAllTasks(userId)
  .then(data => {
    res.send({data})
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  })

})

// POST /todos
app.post('/todos', (req, res) => {
  const taskTitle = req.body.text;
  const userId = Number(req.session.userId);

  getCategory(taskTitle).then(category => {
    addTask({
      user_id: userId,
      task_title: taskTitle,
      task_category: category,
    })
    .then((response) => {
      console.log(response[0])
      res.send(response[0])
    })
  });
});

// app.post('/todos', (req, res) => {
//   console.log('response body:', req.body);
//   const title = req.body.text;
//   const user_id = Number(req.session.userId);
//   getCategory(title).then((category) => {

//     return addTask({user_id, title, category});
//   })
//   .then((rows) => {
//     console.log('rows:', rows);
//     res.status(200).json(rows[0]);
//   }).catch((error) => {
//     res.status(500).json({error});
//   });
// });


app.post('/edit/:id', (req, res) => {
  const userId = Number(req.session.userId);
  const taskId = req.params.id;
  const taskCategory = req.body.category;


    db.query(`
      UPDATE tasks
      SET task_category = $1
      WHERE id = $2`,
      [taskCategory, taskId])
    .then(data => {
      res.json({success: true});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.get('/', (req,res) => {
  console.log(req.session)
  res.render('index', {user: req.session})
});
