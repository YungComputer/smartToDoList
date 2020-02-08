const books = require("google-books-search");
const key = "AIzaSyBB8iVXadw6GW42T9yc_npFzJ8JDYPOX28";
let bookInput = "Guts";

//bookInput will be the search parameter from AJAX
books.search(bookInput, key, function(error, results) {
  if (!error) {
    for (const bookTitle of results) {
      for (const title in bookTitle) {
        if (bookTitle[title] === "Guts") {
          console.log("I found Guts!");
        }
      }
    }
  } else {
    console.log(error);
  }
});

// `https://www.googleapis.com/books/v1/volumes?q=[INPUT]&key=${key}`
