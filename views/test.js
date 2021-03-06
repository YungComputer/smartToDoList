$(document).ready(function() {
  let dropdown = $("#move-dropdown").html().change(event => { event.target.value });
  // Appends all the data together for the to do list.
  const createToDoElement = function(task) {
    // The argument is the task the user inputs.

    let $form = $("<form>").addClass("task-container");
    let $checkBox = $('<input type="checkbox">').addClass("checkbox");
    let $todo = $("<p>").addClass("task-text")
      .addClass("task-item")
      .text(task.task_title)
      .data('taskId', task.id)
      // console.log(task.id)
    //Clone of the dropdown menu
    $form.append($checkBox, $todo, $(dropdown));

    return $form;
  };

  // Renders the data to display the todo box.
  const renderToDo = function(task) {
    const $todos = $(`.${task.task_category}`);
    const $form = createToDoElement(task);
    $todos.append($form);


    const tester = $('.task-item').data('taskId')
    console.log(tester)

  };

  // Renders all the database tasks on user login
  const renderToDos = function(taskArray) {
    taskArray.forEach(task => {

      renderToDo(task)
      console.log(task);
    });
  };
  // CREATE THE FUNCTIONALITY, ALLOW IT TO POPULATE THE LISTS WITH THE DATABASE INFORMATION BASED ON USER

  // Loads all the data up to be required by a POST.
  const loadToDo = (category, currentUser) => {
    // $.get('/tasks', function(data) {
    //   console.log('the data in the loadToDo:', data)
    // })
    console.log("Here is your currentUser:", currentUser)

    $.ajax({
      url: "/tasks",
      method: "GET",
      dataType: "JSON",
      success: result => {
        console.log("here is the results on success in loadToDo:", result);
        result.tasks.forEach(x => {
          console.log(x)
          if(x.user_id === currentUser)
          renderToDo(x.task_title, x.task_category)
        })
      },
      error: (jqxhr, status, err) => {
        console.error("Error on the loadToDo function:", status, err);
      }
    });
  };

  const loadToDos = category => {
    $.ajax({
      url: "/tasks",
      method: "GET",
      dataType: "JSON",
      success: result => {
        // console.log("here is the results on success in loadToDo:", result);
        renderToDos(result.tasks);

        $( ".target" ).change(function(event) {
          console.log( event );
        });


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
        renderToDo(response.task_title, response.task_category);
      })
      .fail(err => {
        console.log(err);
      });
  }
});


  //Change Category

  ;[
    [".edit-read", "books"],
    [".edit-eat", "restaurants"],
    [".edit-watch", "movies"],
    [".edit-buy", "products"]
  ].forEach(spec => {
    let [className, catName] = spec;
      console.log(spec)

    $(className).on("click", event => {
      console.log("Hello on Click")

      event.preventDefault();

      $.ajax({
        url: "/todos",
        method: "POST",
        data: $(className).closest("span")
      })
        .done(category => {
          $("textarea").val(""); // empties the text area
          loadToDo(catName);
        })
        .fail(err => {
          console.log(err);
        });
    });
  });
});
