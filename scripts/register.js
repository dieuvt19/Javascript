"use strict";

// 2. Chức năng: Register
// Chọn element
const btnRegister = document.getElementById("btn-submit");

const userArr = getFromStorage("userArr")
  ? JSON.parse(getFromStorage("userArr"))
  : [];
console.log(userArr);

// Thêm sự kiện click vào nút Register
btnRegister.addEventListener("click", function () {
  const inputFirstName = document.getElementById("input-firstname").value;
  const inputLastName = document.getElementById("input-lastname").value;
  const inputUsername = document.getElementById("input-username").value;
  const inputPassword = document.getElementById("input-password").value;
  const inputConfirmPassword = document.getElementById(
    "input-password-confirm"
  ).value;

  const userData = {
    firstname: inputFirstName,
    lastname: inputLastName,
    username: inputUsername,
    password: inputPassword,
    confirmPassword: inputConfirmPassword,
  };

  // Validate các thông tin
  // Nếu first name bị bỏ trống thì báo lỗi cho người dùng
  if (userData.firstname === "") {
    alert("Please input for First Name!");
    return false;
  }

  // Nếu last name bị bỏ trống thì báo lỗi cho người dùng
  if (userData.lastname === "") {
    alert("Please input for Last Name!");
    return false;
  }

  // Nếu username bị bỏ trống thì báo lỗi cho người dùng
  if (userData.username === "") {
    alert("Please input for Username!");
    return false;
  }

  // Nếu Username trùng với Username của các người dùng trước đó thì thông báo lỗi cho người dùng
  for (let i = 0; i < userArr.length; i++) {
    if (userData.username === userArr[i].username) {
      alert("Username already exists");
      return false;
    }
  }

  // Nếu password bị bỏ trống thì báo lỗi cho người dùng
  if (userData.password === "") {
    alert("Please input for Password!");
    return false;
  }

  // Password phải có nhiều hơn 8 ký tự
  if (userData.password.length <= 8) {
    alert("Password must be more than 8 characters!");
    return false;
  }

  // Nếu confirm password bị bỏ trống thì báo lỗi cho người dùng
  if (userData.confirmPassword === "") {
    alert("Please input for Confirm Password!");
    return false;
  }

  // Nếu password và confirm password khác nhau thì báo lỗi cho người dùng
  if (userData.confirmPassword !== userData.password) {
    alert("Password and Confirm Password must be the same!");
    return false;
  }

  //Khởi tạo user mới với các dữ liệu hợp lệ
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  // Thêm thông tin người dùng đăng ký vào userArr và lưu vào localStorage với key là userArr
  userArr.push(user);
  saveToStorage("userArr", userArr);

  // Thông báo với người dùng tạo tài khoản thành công
  alert("You have successfully registered!");

  // Reset lại form đăng ký
  resetFormRegister();

  // Sau khi tạo tài khoản mới thành công thì chuyển người dùng về trang Login
  window.location.href = "../pages/login.html";
});

// Hàm reset lại form register
function resetFormRegister() {
  document.getElementById("form-register").reset();
}
