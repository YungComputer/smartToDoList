

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    console.log(users, "this is for users");
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });
});

$(document).ready(function () {
  // loadToDo(); // this is to auto populate data from our DB for the starting page.

  // when form gets submitted this should run.

  const $form = $('form');
  $form.on('submit', (event) => {  // look for the element Clare uses
    event.preventDefault();
    const textField = $('textarea').val();
    console.log(textField);


    $.ajax({
      url: '/todos',
      method: 'POST',
      data: textField,
    })
      .done((post) => {
        $('textarea').val('') // figure out the element Clare uses, this emptys the textarea

      })
      .fail((err) => {
        console.log(err);
      })
  });


  $("#submit-btn").on("click", event => {
    // look for the element Clare uses
    event.preventDefault();
    console.log("HERE");
    const textField = $("textarea").val();
    $.ajax({
      url: "/todos",
      method: "POST",
      data: $("#task-form").serialize()
    })
      .done(post => {
        $("textarea").val(""); // empties the text area
      })
      .fail(err => {
        console.log(err);
      });
  });
});
