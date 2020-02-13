// require('dotenv').config({ path: '../.env' }); Leave this for testing as standalone

const books = require("google-books-search");
const key = process.env.BOOKS_API_KEY;

const book = function(task) {
  const bookSearch = task.toLowerCase();

  return new Promise ((resolve, reject) => {
    books.search(bookSearch, key, function(error, results) {

      if (!error) {
        for (const bookTitle of results) {
          const lowerCaseTitle = bookTitle.title.toLowerCase();
          if (lowerCaseTitle.search(bookSearch) === 0){
            console.log('We found a book for you:', bookTitle.title)
            return resolve(true);
          }
        }
        console.log('Sorry couldn\'t find a book with the name:', task)
        return resolve(false);

      } else {
        console.log(error, 'nothing showed up for books');
        return resolve(false);
      }
    });
  })
}

// `https://www.googleapis.com/books/v1/volumes?q=[INPUT]&key=${key}`
module.exports = { book };
