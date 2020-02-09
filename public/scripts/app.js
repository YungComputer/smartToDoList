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

  loadToDo(); // this is to auto populate data from our DB for the starting page.

  // when form gets submitted this should run.
  $form.on('submit', (event) => {  // look for the element Clare uses
    event.preventDefault();

    const category = getCategory(textinput)

    if (category) {  // calls yelpLibrary.js function with text input from user

      $.ajax({
        url: '/todos',
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
    }
  });

});
