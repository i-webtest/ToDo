"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const headerBtn = document.querySelector(".header-button");
const todoItem = document.querySelector(".todo-item");

let toDoData = [];

//сохранение данных в localStorage
let saveLocalStorage = function () {
  localStorage.setItem("key", JSON.stringify(toDoData));
};

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item) {
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
      saveLocalStorage();
      render();
    });

    // удаление при нажатии на корзину
    const buttonRemove = li.querySelector(".todo-remove");

    buttonRemove.addEventListener("click", function () {
      let index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      saveLocalStorage();
      render();
    });
    console.log(li);
  });
};

if (localStorage.getItem("key")) {
  toDoData = JSON.parse(localStorage.getItem("key"));
  render();
}

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  headerInput.value = "";
  saveLocalStorage();
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

  headerInput.value = "";

  changeButton();
};

changeButton();
headerInput.addEventListener("input", changeButton);
todoControl.addEventListener("submit", dataSend);
