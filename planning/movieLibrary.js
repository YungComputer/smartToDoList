require('dotenv').config({ path: '../.env' });

const omdb = require("omdb-client");
const key = process.env.OMDB_API_KEY;
const movie = 'The Terminator' // Needs to change into our search parameter

const params = {
  apiKey: key,
  title: movie,
};

omdb.get(params, function(err, data) {
  if (!err) {
    console.log(data.Title);
  }
  if (err) {
    console.error(err);
  }
});
