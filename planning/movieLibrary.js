const omdb = require("omdb-client");

const params = {
  apiKey: "4b6c6fe2",
  title: "The Terminator"
};

omdb.get(params, function(err, data) {
  if (!err) {
    console.log(data.Title);
  }
  if (err) {
    console.error(err);
  }
});
