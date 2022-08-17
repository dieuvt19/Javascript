"use strict";

// 6. Hiển thị các bài viết
// Chọn element
const newsContainer = document.getElementById("news-container");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
let pageEl = document.getElementById("page-num");
const apiKey = "a942100d2dd243cb9cd4b13fa47487f9";
let country = "us";

const userSetting = getFromStorage("userSetting")
  ? JSON.parse(getFromStorage("userSetting"))
  : [{ newsPerPage: "10", newsCategory: "Business" }];

// Hàm render hiển thị các bài báo
const renderNews = function (data) {
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
    newsContainer.innerHTML = html;
  }
};

const renderError = function (msg) {
  newsContainer.innerHTML = msg;
};

// Hàm nhận news từ API
const getNews = async function (country, category, pageSize, page, apiKey) {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await res.json();
    renderNews(data);

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

getNews(
  `${country}`,
  `${userSetting[0].newsCategory}`,
  `${userSetting[0].newsPerPage}`,
  "1",
  `${apiKey}`
);

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

  getNews(
    `${country}`,
    `${userSetting[0].newsCategory}`,
    `${userSetting[0].newsPerPage}`,
    `${page}`,
    `${apiKey}`
  );
});

// Khi nhấn nút Previous thì chuyển sang trang trước đó
btnPrevious.addEventListener("click", function () {
  // Quay về trang trước thì hiển thị nút Next lên
  btnNext.style.display = "block";
  renderPageNumPre();

  getNews(
    `${country}`,
    `${userSetting[0].newsCategory}`,
    `${userSetting[0].newsPerPage}`,
    `${page}`,
    `${apiKey}`
  );
});
