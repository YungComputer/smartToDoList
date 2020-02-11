
// Appends all the data together for the to do list.
const createToDoElement = function(todo) { // The argument is the task the user inputs.
  let $checkBox = $('<input>').addClass('checkbox')
  let $todo = $('<span>').addClass('task-item'); // Not sure what elements/ids/classes are being used yet
  $checkBox.append($todo);

  return $checkBox;
};

// Renders the data to display the todo box.
const renderToDo = function(todos) {
  const $todos = $('.task-container'); // Have to figure out the element/id/class
  // before adding all the new tasks in, maybe clear out all the existing ones?
  todos.forEach((todo) => {
    const $form = createToDoElement(todo);
    $todos.append($form);
  });
};

// Loads all the data up to be required by a POST.

const loadToDo = () => {
  $.ajax({
    url: '/tasksAsJson',  // what is the route we need?
    method: 'GET',
    dataType: 'JSON',
    success: (result) => {
      console.log(result);
      renderToDo(result);
    },
    error: (jqxhr, status, err) => {
      console.error("holy shit", status, err);
    }
  })
}


loadToDo();


const postToDo = () => {
  $.ajax({
    url: '/todos',  
    method: 'POST',
    dataType: 'text',
    success: (post) => {
      console.log(post);
      renderToDo(post);
    }
  })
}

// loadToDo();
// postToDo();


// module.exports = { getCategory, createToDoElement, renderToDo, loadToDo };
