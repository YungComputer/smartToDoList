require('dotenv').config({ path: '../.env' });

const books = require("google-books-search");
const key = process.env.BOOKS_API_KEY;
let bookInput = "Guts"; // Needs to change into our search parameter.
console.log(key)
//bookInput will be the search parameter from AJAX
books.search(bookInput, key, function(error, results) {
  if (!error) {
    for (const bookTitle of results) {
      for (const title in bookTitle) {
        if (bookTitle[title] === "Guts") {
          console.log("I found Guts!");
          // console.log(results)
        }
      }
    }
  } else {
    console.log(error);
  }
});

// `https://www.googleapis.com/books/v1/volumes?q=[INPUT]&key=${key}`
