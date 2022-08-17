"use strict";

//Chọn element
const btnLogin = document.getElementById("btn-submit");
// Lấy dữ liệu từ localstorage
const userLgArr = getFromStorage("userLgArr")
  ? JSON.parse(getFromStorage("userLgArr"))
  : [];

const userArr = getFromStorage("userArr")
  ? JSON.parse(getFromStorage("userArr"))
  : [];
console.log(userArr);

// Thêm sự kiện khi click vào nút Login
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  const usernameLogin = document.getElementById("input-username").value;
  const passwordLogin = document.getElementById("input-password").value;

  const dataUserLogin = {
    username: usernameLogin,
    password: passwordLogin,
  };

  // Validate dữ liệu
  // Nếu username bị bỏ trống thì báo lỗi cho người dùng
  if (dataUserLogin.username === "") {
    alert("Please input for Username!");
    return false;
  }

  // Nếu password bị bỏ trống thì báo lỗi cho người dùng
  if (dataUserLogin.password === "") {
    alert("Please input for Password!");
    return false;
  }

  // Nếu password ít hơn 8 ký tự thì báo lỗi cho người dùng
  if (dataUserLogin.password.length <= 8) {
    alert("Password must be more than 8 characters!");
    return false;
  }
  // Nếu các thông tin nhập vào trùng với User đã có ở trong danh sách thì lưu thông tin người dùng hiện tại vào userLgArr
  const userLgArr = userArr.filter(
    (i) =>
      i.username === dataUserLogin.username &&
      i.password === dataUserLogin.password
  );
  console.log(userLgArr);

  // Nếu userLgArr = [] hay không trùng với user nào đã đăng ký thì thông báo lỗi đến người dùng
  if (userLgArr.length < 1) {
    alert("Username or password is incorrect");
    return false;
  } else {
    // Nếu userArr có phần tử thì thông báo là đã đăng nhập thành côn và lưu vào localstorage với key 'userLgArr'
    alert("Logged in successfully");
    saveToStorage("userLgArr", userLgArr);

    // Sau khi đăng nhập thành công thì chuyển người dùng về trang Home
    window.location.href = "../index.html";
  }
});
