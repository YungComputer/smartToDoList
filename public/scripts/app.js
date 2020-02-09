$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    console.log(users, 'this is for users')
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});



$(document).ready(function() {

  // ************* HELPER FUNCTIONS BELOW **************
  // Appends all the data together for the to do list.
  const createToDoElement = function(todo) { // The argument is the task the user inputs.
    let $checkBox = $('<checkbox>').addclass('insertclass')
    let $todo = $('<span>').addClass('insertclass'); // Not sure what elements/ids/classes are being used yet
    $checkBox.append($todo);

    return $checkBox;
  };

  // Renders the data to display the todo box.
  const renderToDo = function(todos) {
    todos.forEach((todo) => {
      const $todos = $('#todoContainer'); // Have to figure out the element/id/class
      const $article = createToDoElement(todo);
      $todos.append($article);
    });
  };

  // Loads all the data up to be required by a POST.
  const loadToDo = () => {
    $.ajax({
      url: '/',  // what is the route we need?
      method: 'GET',
      dataType: 'JSON',
      success: (post) => {
        renderToDo(post);
      }
    })
  }
  loadToDo(); // this is to auto populate data from our DB for the starting page.


  // when form gets submitted this should run.
  $form.on('submit', (event) => {  // look for the element Clare uses
    event.preventDefault(); // check if this is needed


    if (restaurants(input)) {  // calls yelpLibrary.js function with text input from user
      $.ajax({
        url: '/restaurants',
        method: 'POST',
        data: serialized,
      })
        .done((post) => {
          $textField.val('') // figure out the element Clare uses, this emptys the textarea
          loadToDo();
        })
        .fail((err) => {
          console.log(err);
        })
    } else if (books(input)) { // calls booksLibrary.js function with text input from user
      $.ajax({
        url: '/books',
        method: 'POST',
        data: serialized,
      })
        .done((post) => {
          $textField.val('') // figure out the element Clare uses, this emptys the textarea
          loadToDo();
        })
        .fail((err) => {
          console.log(err);
        })
    } else if (movies(input)) { // calls movieLibrary.js function with text input from user
      $.ajax({
        url: '/movies',
        method: 'POST',
        data: serialized,
      })
        .done((post) => {
          $textField.val('') // figure out the element Clare uses, this emptys the textarea
          loadToDo();
        })
        .fail((err) => {
          console.log(err);
        })
    } else {
      $.ajax({  // using AJAX
        url: '/products',
        method: 'POST',
        data: serialized
      })
        .done((todo) => {
          $textField.val('') // figure out the element Clare uses, this emptys the textarea
          loadToDo();
        })
        .fail((err) => {
          console.log(err)
        });
    }
  });


});
