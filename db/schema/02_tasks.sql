DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  task_title VARCHAR(255) NOT NULL,
  task_category VARCHAR(255)
);
