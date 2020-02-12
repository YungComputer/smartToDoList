const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const pool = new Pool({
  host: dbParams.host,
  user: dbParams.user,
  password: dbParams.password,
  database: dbParams.database,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Grab all the tasks based on userid from DATABASE
const getAllTasks = function(user_id) {
  const query =
  `SELECT task_title, task_category
  FROM tasks
  JOIN users ON users.id = tasks.user_id
  WHERE tasks.user_id = $1;
  `;

  return pool.query(query, [user_id])
  .then(res => res.rows)
  .catch(err => err)
}

exports.getAllTasks = getAllTasks;


// Adds tasks to the DATABASE
const addTask = function(newTask) {
  const taskArray = [newTask.user_id, newTask.task_title, newTask.task_category];

  const query =
  `INSERT INTO tasks (user_id, task_title, task_category)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  return pool.query(query, taskArray)
  .then(res => res.rows)
  .catch(err => err)
}

exports.addTask = addTask;

exports.dbParams = dbParams;
