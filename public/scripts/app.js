$(document).ready(function() {
  // Appends all the data together for the to do list.
  const createToDoElement = function(task) {

    let options =

    {restaurants:
      $(`<select class="target">
          <option value="restaurants" selected>To Eat</option>
          <option value="books">To Read</option>
          <option value="movies">To Watch</option>
          <option value="products">To Buy</option>
    </select>`),
    books:
    $(`<select class="target">
        <option value="restaurants" >To Eat</option>
        <option value="books" selected>To Read</option>
        <option value="movies">To Watch</option>
        <option value="products">To Buy</option>
  </select>`),
    movies:
      $(`<select class="target">
          <option value="restaurants">To Eat</option>
          <option value="books">To Read</option>
          <option value="movies" selected>To Watch</option>
          <option value="products">To Buy</option>
    </select>`),
    products:
      $(`<select class="target">
          <option value="restaurants">To Eat</option>
          <option value="books">To Read</option>
          <option value="movies">To Watch</option>
          <option value="products" selected>To Buy</option>
    </select>`)
  }

    let $form = $("<form>").addClass("task-container");
    let $checkBox = $('<input type="checkbox">').addClass("checkbox");
    let $todo = $("<p>").addClass("title-text")
      .addClass("task-item")
      .text(task.task_title)
      .data('taskId', task.id)

      const editButton = options[task.task_category];

      editButton.change( (event) => {
        $.post(`/edit/${task.id}`, {category: event.target.value})
        .then(() => {loadToDos()})

      })

    $form.append($checkBox, $todo, editButton);

    return $form;
  };

  // Renders the data to display the todo box.
  const renderToDo = function(task) {
    const $todos = $(`.${task.task_category}`);
    const $form = createToDoElement(task);
    const $hr = $("<hr>");

    $todos.append($form, $hr);
  };

  // Renders all the database tasks on user login
  const renderToDos = function(taskArray) {
    taskArray.forEach(task => {
      renderToDo(task)
    });
  };
  // CREATE THE FUNCTIONALITY, ALLOW IT TO POPULATE THE LISTS WITH THE DATABASE INFORMATION BASED ON USER

  const clearList = function() {
    $('.books').empty();
    $('.movies').empty();
    $('.restaurants').empty();
    $('.products').empty();
  }

  // Loads all the data up to be required by a POST.
  const loadToDos = category => {
    $.ajax({
      url: "/tasks",
      method: "GET",
      dataType: "JSON",
      success: result => {
        clearList();
        renderToDos(result.tasks);
      },
      error: (jqxhr, status, err) => {
        console.error("Error on the lodaToDo function:", status, err);
      }
    });
  };

  loadToDos(); // this is to auto populate data from our DB for the starting page.

  // when form gets submitted this should run.
  $("#submit-btn").on("click", event => {
    event.preventDefault();
    if($("textarea").val().trim().length < 1)
{
    alert("Please Enter Text...");
    return;
} else {
    $.ajax({
      url: "/todos",
      method: "POST",
      data: $("#task-form").serialize()
    })
      .done(response => {
        $("textarea").val(""); // empties the text area
        renderToDo(response);
      })
      .fail(err => {
        console.log(err);
      });
  }
});

});
