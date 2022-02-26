"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const headerBtn = document.querySelector(".header-button");

const basketBtn = document.querySelector(".todo-remove");
const todoItem = document.querySelector(".todo-item");
// console.log(todoControl);
// console.log(headerInput);
// console.log(todoList);
// console.log(todoCompleted);
// console.log(headerBtn);
// console.log(basketBtn);

const toDoData = [
  // {
  //   text: "Сварить кофе",
  //   completed: false,
  // },
  // {
  //   text: "Помыть посуду",
  //   completed: true,
  // },
];
console.log(toDoData);

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    //удаление при нажатии на корзину

    toDoData.splice();
    li.querySelector(".todo-remove").addEventListener("click", function () {
      li.remove();
      console.log(toDoData);
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  headerInput.value = "";

  render();
});

const changeButton = function () {
  if (headerInput.value.trim()) {
    headerBtn.disabled = false;
    return;
  }
  headerBtn.disabled = true;
};

const dataSend = function (event) {
  event.preventDefault();

  // console.log("Отправка данных: " + headerInput.value);
  headerInput.value = "";

  changeButton();
};

changeButton();
headerInput.addEventListener("input", changeButton);
todoControl.addEventListener("submit", dataSend);

// function TodoCtrl($scope) {
//   $scope.todos = [
//     { text: "learn angular", done: true },

//     { text: "build an angular app", done: false },
//   ];

//   $scope.addTodo = function () {
//     $scope.todos.push({ text: $scope.todoText, done: false });

//     $scope.todoText = "";
//   };

//   $scope.archive = function (indx) {
//     $scope.todos.splice(indx, 1);
//   };
// }

// function remove() {
// var reg = document.getElementById("reg").value;

// let mydiv = document.createElement("div");
// mydiv.className = "reg";
// mydiv.id = "mydiv";
// mydiv.innerHTML =
//   "<strong>Ура!</strong>Вы прочитали это важное сообщение.<button id = 'buttonCheck'>Проверить</button>";
// document.body.appendChild(mydiv);
//   basketBtn.onclick = removeTodoItem;
// }

// function removeTodoItem() {
//   todoItem.remove();
// }
// basketBtn.addEventListener("click", remove);
