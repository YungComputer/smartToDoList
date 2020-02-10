// require('dotenv').config({ path: '../.env' });
// Leave this for testing as standalone

const omdb = require("omdb-client");
const key = process.env.OMDB_API_KEY;

const movie = (task) => {
  omdb.get({ apiKey: key, title: task }, function(err, data) {
    if (!err) {
      console.log('Here is your movie:', data.Title);
    }
    if (err) {
      console.error(err);
    }
  });
}

module.exports = { movie }
