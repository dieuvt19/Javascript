"use strict";

// 1. Tạo Class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstname = firstName;
    this.lastname = lastName;
    this.username = username;
    this.password = password;
  }
}

// 8. Hiển thị Todo List
// Tạo Class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
