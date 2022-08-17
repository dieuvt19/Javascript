"use strict";

// Chọn element
const inputSearch = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const newsSearch = document.getElementById("news-search");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
let pageEl = document.getElementById("page-num");
let pageSize = "10";

const apiKey = "a942100d2dd243cb9cd4b13fa47487f9";

// Hàm render kết quả tìm kiếm theo từ khóa
const renderSearchAPI = function (data) {
  let html = ``;
  for (let i = 0; i < data.articles.length; i++) {
    html += `
      <div class="main-content">
        <div class="news-img-left">
          <img class="news-img" src="${data.articles[i].urlToImage}" />
        </div>
        <div class="news-data-right">
          <h4 class="news-title">${data.articles[i].title}</h4>
          <p class="news-description">${data.articles[i].description}</p>
          <button class="news-button">View</button>
        </div>
      </div>

  `;

    newsSearch.innerHTML = html;
  }
};

// Hàm renderError thông báo khi có lỗi xảy ra
const renderError = function (msg) {
  newsSearch.innerHTML = msg;
};

// Hàm search
btnSearch.addEventListener("click", function () {
  // Validate dữ liệu input
  if (inputSearch.value === "") {
    alert("Please input for Search!");
    return false;
  }
  console.log(inputSearch.value);
  getSearchAPI(`${inputSearch.value}`, `${pageSize}`, "1", `${apiKey}`);
});

// Lấy dữ liệu từ API
const getSearchAPI = async function (keySearch, pageSize, page, apiKey) {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${keySearch}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await res.json();
    console.log(data);
    renderSearchAPI(data);

    // Tổng số trang hiển thị sẽ bằng tổng số kết quả chia cho số lượng bài viết hiển thị của mỗi trang
    let totalPages = data.totalResults / pageSize;
    // Nếu số trang hiện tại bằng tổng số trang thì nút Next sẽ bị ẩn đi
    if (page >= totalPages) {
      btnNext.style.display = "none";
    }
    // Nếu đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi
    if (page <= 1) {
      btnPrevious.style.display = "none";
    }
  } catch (err) {
    console.error(`${err}`);
    renderError(`${err.message}`);
  }
};

// 7. Chuyển trang cho các bài viết
// Khi nhấn vào nút thì cập nhật số trang tương ứng
let page = 1;
function renderPageNumNext() {
  page = ++page;
  return (pageEl.innerHTML = `${page}`);
}

function renderPageNumPre() {
  page = --page;
  return (pageEl.innerHTML = `${page}`);
}

// Khi nhấn nút Next thì chuyển trang tiếp theo
btnNext.addEventListener("click", function () {
  // Qua trang kế tiếp thì hiển thị nút Previous
  btnPrevious.style.display = "block";
  renderPageNumNext();

  getSearchAPI(`${inputSearch.value}`, `${pageSize}`, `${page}`, `${apiKey}`);
});

// Khi nhấn nút Previous thì chuyển sang trang trước đó
btnPrevious.addEventListener("click", function () {
  // Quay về trang trước thì hiển thị nút Next lên
  btnNext.style.display = "block";
  renderPageNumPre();

  getSearchAPI(`${inputSearch.value}`, `${pageSize}`, `${page}`, `${apiKey}`);
});
