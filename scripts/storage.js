"use strict";

// Lưu dữ liệu dưới LocalStorage
// Hàm lưu dữ liệu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Truy xuất dữ liệu từ localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
