// require('dotenv').config({ path: '../.env' }); Leave this for testing as standalone

const books = require("google-books-search");
const key = process.env.BOOKS_API_KEY;
// let bookInput = "Guts"; // Needs to change into our search parameter.

//bookInput will be the search parameter from AJAX
const book = function(task) {
  return new Promise ((resolve, reject) => {
    books.search(task, key, function(error, results) {
      if (!error) {
        for (const bookTitle of results) {
          for (const title in bookTitle) {
            if (bookTitle[title] === task) {
              console.log("I found book:", task);
              return resolve(true);
              // console.log(results)
            }
          }
        }
        return resolve(false);

      } else {
        // Jeremy thinks this code is misleading
        console.log(error, 'nothing showed up for books');
        return resolve(false);
      }
    });
  })
}

// `https://www.googleapis.com/books/v1/volumes?q=[INPUT]&key=${key}`
module.exports = { book };
