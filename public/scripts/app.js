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
  const createToDoElement = function(todo) {
    let $todo = $('<span>').addClass(''); // Not sure what elements/ids/classes are being used yet
    let $img = $('<img>').addClass('icon').attr("src", todoicon);
    let $buttonEdit = $('<button>').addClass('edit-button');
    let $buttonComplete = $('<button>').addClass('complete-button');
    $todo.append($img, $buttonEdit, $buttonComplete);

    return $todo;
  }

  // Renders the data to display the todo box.
  const renderToDo = function(todos) {
    todos.forEach((todo) => {
      const $todos = $('#todoContainer'); // Have to figure out the element/id/class
      const $article = createToDoElement(todo);
      $todos.prepend($article);
    })
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






    $.ajax({  // using AJAX
      url: '/',
      method: 'POST',
      data: serialized
    })
      .done((todo) => {
        document.getElementById('task').innerText = ''
        document.getElementById('date').innerText = ''
        document.getElementById('priority').innerText = ''
        loadToDo();
      })
      .fail((err) => {
        console.log(err)
      });
  });

});
