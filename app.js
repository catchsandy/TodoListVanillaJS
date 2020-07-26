//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Evemt listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  //prevent form  from submitting
  event.preventDefault();
  //console.log('hello');

  //Create todo div

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li

  const todoLi = document.createElement("li");
  todoLi.innerText = todoInput.value;
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);
  //Add todo to localstorage
  saveLocalTodos(todoInput.value);

  //Check mark button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Apend to list

  todoList.appendChild(todoDiv);

  //clear TodoInput Value
  todoInput.value = "";
}
function deleteCheck(e) {
  // console.log(e.target);
  const item = e.target;
  //delete code
  if (item.classList[0] === "trash-btn") {
    //console.log(item.classList[0]);
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //checkmark
  if (item.classList[0] === "complete-btn") {
    //console.log(item.classList[0]);
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  //const todos = todoList.childNodes;
  const todos = document.querySelectorAll(".todo");

  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        console.log("completed");
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          console.log("flex");
        } else {
          todo.style.display = "none";
          console.log("none");
        }
        break;
      case "uncompleted":
        console.log("uncompleted");
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  // check if already exits
  console.log("save");
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];

    console.log("save1");
  } else {
    console.log("save2");
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    console.log("save1");
  } else {
    console.log("save2");
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li

    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    //Check mark button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Apend to list

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  console.log("save2");
  localStorage.setItem("todos", JSON.stringify(todos));
}
