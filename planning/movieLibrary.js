const omdb = require("omdb-client");

const movie = 'The Terminator' // Needs to change into our search parameter

const params = {
  apiKey: "4b6c6fe2",
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
