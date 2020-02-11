

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     console.log(users, "this is for users");
//     for (let user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });

$(document).ready(function () {

// Appends all the data together for the to do list.
const createToDoElement = function(todo) { // The argument is the task the user inputs.

  let $form = $('<form>').addClass('task-container')
  let $checkBox = $('<input type="checkbox">').addClass('checkbox')
  let $todo = $('<span>').addClass('task-item').text(todo); // Not sure what elements/ids/classes are being used yet
  $form.append($checkBox, $todo);

  return $form;
};

// Renders the data to display the todo box.
const renderToDo = function(todos) {
  console.log('rendertodo argument:', todos)
  const $todos = $('.task-container'); // Have to figure out the element/id/class
  // before adding all the new tasks in, maybe clear out all the existing ones?
    const $form = createToDoElement(todos)
    $todos.append($form);
};

// Loads all the data up to be required by a POST.

const loadToDo = () => {
  $.ajax({
    url: '/tasksAsJson',  // what is the route we need?
    method: 'GET',
    dataType: 'JSON',
    success: (result) => {
      console.log('loadToDo results:', result[0].title);
      renderToDo(result[0].title);
    },
    error: (jqxhr, status, err) => {
      console.error("Error on the lodaToDo function:", status, err);
    }
  })
}


  // loadToDo(); // this is to auto populate data from our DB for the starting page.

  // when form gets submitted this should run.
  $("#submit-btn").on("click", event => {
    // look for the element Clare uses
    event.preventDefault();
    const textField = $("textarea").val();
    // console.log("User textarea input:", textField);
    // console.log('serialize me:', $("textarea").serialize())


    $.ajax({
      url: "/todos",
      method: "POST",
      data: $("#task-form").serialize()
    })
      .done(category => {
        console.log(category)
        $("textarea").val(""); // empties the text area
        loadToDo();
      })
      .fail(err => {
        console.log(err);
      });
  });
});
