/* Assignment 04: Finishing a Todo List App
*/

// Array to store todo items---------------------------------------------------------------------------
const todoItems = [];

//constants
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const emptyState = document.getElementById('emptyState');

//function to update display of the empty state message
function updateEmptyState() {
  if (todoItems.length > 0) {
    emptyState.style.display = 'none';
  } else {
    emptyState.style.display = 'block';
  }
}

//add todo---------------------------------------------------------------------------------------------
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    try {
      //unique ID using the current timestamp (EMAIL HE SENT FOR 3)
      const todoId = new Date().getTime();
      //new todo item object
      const todoItem = {
        id: todoId,
        text: todoText,
        completed: false,
      };

      //add the new todo item to the array
      todoItems.push(todoItem);
      //update the UI to show it
      renderTodoList();
      //clear the input field
      todoInput.value = '';
      //upsate display of empty state message
      updateEmptyState();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  } else {
    console.error('Todo text cannot be empty.');
  }//just in case!
}

//toggle completion----------------------------------------------------------------------------------
function toggleComplete(todoId) {
  const todoItem = todoItems.find(item => item.id === todoId);
  if (todoItem) {
    try {
      //toggle the completed status of the todo item
      todoItem.completed = !todoItem.completed;
      //update the UI showing the new completed status
      renderTodoList();
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  } else {
    console.error(`Todo item with ID ${todoId} not found.`);
  }
}

//delete todo ----------------------------------------------------------------------------------------
function deleteTodo(todoId) {
  //check that todoId is a valid number
  if (typeof todoId !== 'number' || isNaN(todoId)) {
    console.error('Invalid input type.');
    return;
  }

  //check that todoId exists before attempting to delete
  let indexToRemove = todoItems.findIndex(item => item.id === todoId);
  if (indexToRemove === -1) {
    console.error(`Todo item with ID ${todoId} not found.`);
    return;
  }

  //delete the todo item from the array
  try {
    todoItems.splice(indexToRemove, 1);
    //update the UI
    renderTodoList();
    //update the display of the empty state message
    updateEmptyState();
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

//render the todo list --------------------------------------------------------------------------------
function renderTodoList() {
  //clearcurrent content of the todo list
  todoList.innerHTML = '';
  //"iterate" over each todo item and create HTML elements for them
  todoItems.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todoItem');

    //the inner HTML of the todo item element
    todoItem.innerHTML = `
      <span>${todo.text} ${todo.completed ? '(COMPLETED)' : ''}</span>
      <button onclick="toggleComplete(${todo.id})" class="dBtn" >Done</button>
      <button onclick="deleteTodo(${todo.id})" class="delBtn" >Delete</button>
    `;

    //add the 'completed' class (GO TO CSS) to the todo item if it is completed
    if (todo.completed) {
      todoItem.classList.add('completed');
    }

    //append the todo item element to the todo list
    todoList.appendChild(todoItem);
  });
}

//event listener for the 'keyup' event to add a todo item when Enter is pressed------------------------
document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});