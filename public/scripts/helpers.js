
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
    url: '/todos',  
    method: 'GET',
    dataType: 'text',
    success: (post) => {
      console.log(post);
      renderToDo(post);
    }
  })
}

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
