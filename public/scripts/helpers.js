
// Appends all the data together for the to do list.
const createToDoElement = function(todo) { // The argument is the task the user inputs.
  let $checkBox = $('<input>').addclass('checkbox')
  let $todo = $('<span>').addClass('task-item'); // Not sure what elements/ids/classes are being used yet
  $checkBox.append($todo);

  return $checkBox;
};

// Renders the data to display the todo box.
const renderToDo = function(todos) {
  todos.forEach((todo) => {
    const $todos = $('.task-container'); // Have to figure out the element/id/class
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
    success: (post) => {
      renderToDo(post);
    }
  })
}

module.exports = { getCategory, createToDoElement, renderToDo, loadToDo };
