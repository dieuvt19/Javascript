"use strict";

// Chọn element
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const btnLogout = document.getElementById("btn-logout");

// Lấy dữ liệu từ localstorage
const userLgArr = getFromStorage("userLgArr")
  ? JSON.parse(getFromStorage("userLgArr"))
  : [];

const userArr = getFromStorage("userArr")
  ? JSON.parse(getFromStorage("userArr"))
  : [];

if (userLgArr.length > 0) {
  // Nếu người dùng đã đăng nhập thì không hiển thị login-modal
  loginModal.style.display = "none";

  // Hiển thị thông điệp chào mừng: "Welcome + Firstname"
  document.getElementById(
    "welcome-message"
  ).innerHTML = `Welcome ${userLgArr[0].firstname}`;
} else {
  // Ngược lại nếu người dùng chưa đăng nhập thì không hiển thị main-content
  mainContent.style.display = "none";
}

// 5. Chức năng Logout
// Thêm sự kiện khi click vào nút Logout: xóa User hiện tại ở Localstorage và đưa người dùng trở lại trang Login
btnLogout.addEventListener("click", function () {
  if (confirm("Are you sure?")) {
    userLgArr.splice(0, 1);
    loginModal.style.display = "block";
    mainContent.style.display = "none";
    saveToStorage("userLgArr", userLgArr);
  }
});
