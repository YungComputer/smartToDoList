// require('dotenv').config({ path: '../.env' });
// Leave this for testing as standalone

const omdb = require("omdb-client");
const key = process.env.OMDB_API_KEY;

const movie = (task) => {
  return new Promise ((resolve, reject) => {
    omdb.get({ apiKey: key, title: task }, function(err, data) {
      if (!err) {
        console.log('Here is your movie:', data.Title);
        return resolve(true);
      }
      if (err) {
        console.log('Can\'t find a movie with that title:', task);
        return resolve(false);
      }
    });
  })
}

module.exports = { movie }
