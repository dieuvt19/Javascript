"use strict";

// Chọn element
const btnSaveStg = document.getElementById("btn-submit");

const userSetting = [];

// Thêm sự kiện khi click vào nút Save Settings
btnSaveStg.addEventListener("click", function () {
  const newsPerPage = document.getElementById("input-page-size").value;
  const newSCategory = document.getElementById("input-category").value;

  // Validate dữ liệu nhập vào
  // Nếu News per page bị bỏ trống thì thông báo lỗi đến người dùng
  if (newsPerPage === "") {
    alert("Please input for for News per page!");
    return false;
  }

  const inputSettings = {
    newsPerPage: newsPerPage,
    newsCategory: newSCategory,
  };

  userSetting.push(inputSettings);
  saveToStorage("userSetting", userSetting);
});
