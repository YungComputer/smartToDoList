// Categorizes the task.
const getCategory = (task) => {

  if (restaurant(task)) {
    return 'restaurants';
  }
  if (book(task)) {
    return  'books';
  }
  if (movie(task)) {
    return  'movies';
  }
  return 'products';

}

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

module.exports = { getCategory, createToDoElement, renderToDo, loadToDo };
