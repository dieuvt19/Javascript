"use strict";

// Chọn element
const btnAdd = document.getElementById("btn-add");
const taskList = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");
const check = document.querySelector(".checked");

// Lấy dữ liệu mảng người dùng
const userLgArr = getFromStorage("userLgArr")
  ? JSON.parse(getFromStorage("userLgArr"))
  : [];

// Lấy dữ liệu danh sách Task
const todoArr = getFromStorage("todoArr")
  ? JSON.parse(getFromStorage("todoArr"))
  : [];

// Ẩn đi các todo list mặc định
taskList.style.display = "none";

let todoArrUser = todoArr.filter((i) => i.owner === userLgArr[0].username);

renderTask(todoArrUser);

// Hàm hiển thị các task
function renderTask(todoArrUser) {
  taskList.innerHTML = "";
  let table = "";
  for (let i = 0; i < todoArrUser.length; i++) {
    table += `
      <li class="${
        todoArrUser[i].isDone === "true" ? "checked" : ""
      }" onclick="checkedTask('${todoArrUser[i].task}')">
      ${todoArrUser[i].task}
      <span class="close" onclick="deleteTask('${
        todoArrUser[i].task
      }')">×</span>
      </li>
      `;
  }
  taskList.innerHTML += table;
  inputTask.value = "";
  inputTask.placehoder = "Title...";
  if (todoArrUser.length < 0) {
    taskList.style.display = "none";
  } else {
    taskList.style.display = "block";
  }
}

// Thêm sự kiện khi click vào nút Add thì thêm một việc vào danh sách todo-list
btnAdd.addEventListener("click", function () {
  // Validate dữ liệu
  // Nếu input Task bị bỏ trống thì thông báo lỗi đến người dùng
  if (inputTask.value === "") {
    alert("Please input for Task");
    return false;
  }

  // Khởi tạo task mới
  const taskAdd = new Task(
    `${inputTask.value}`,
    `${userLgArr[0].username}`,
    `false`
  );

  // Thêm task mới vừa tạo vào mảng todoArr, hiển thị lên web và lưu vào localstorage
  todoArr.push(taskAdd);
  saveToStorage("todoArr", todoArr);
  todoArrUser = todoArr.filter((i) => i.owner === userLgArr[0].username);
  renderTask(todoArrUser);
});

function checkedTask(checked) {
  for (let i = 0; i < todoArrUser.length; i++) {
    let liEl = document.querySelectorAll("#todo-list li");
    if (todoArrUser[i].task === checked) {
      // Đánh dấu việc đã hoàn thành
      if (todoArrUser[i].isDone === "false") {
        todoArrUser[i].isDone = "true";
        liEl[i].classList.add("checked");
      }
      // Đánh dấu việc chưa hoàn thành
      else if (todoArrUser[i].isDone === "true") {
        todoArrUser[i].isDone = "false";
        liEl[i].classList.remove("checked");
      }
      saveToStorage("todoArr", todoArr);
    }
  }
}

// Hàm xóa một task
function deleteTask(task) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].task === task) {
        todoArr.splice(i, 1);
        saveToStorage("todoArr", todoArr);
        todoArrUser = todoArr.filter((i) => i.owner === userLgArr[0].username);
        renderTask(todoArrUser);
      }
    }
  }
}
