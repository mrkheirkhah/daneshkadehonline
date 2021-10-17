<template>
  <div class="panel-table withdraw-list">
    <div class="box-header">
      <h3>لیست برداشت ها</h3>
      <form action="">
        <div class="filter floated-list-container">
          <input type="text" readonly value="فیلتر بر اساس" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.969"
            height="6.03"
            viewBox="0 0 10.969 6.03"
          >
            <g transform="translate(10.719 0.25) rotate(90)">
              <path
                data-name="Path 88161"
                d="M5.445,5.026.506.087A.3.3,0,1,0,.087.506L4.815,5.234.087,9.962a.3.3,0,0,0,0,.419.3.3,0,0,0,.208.088A.289.289,0,0,0,.5,10.381L5.442,5.442A.3.3,0,0,0,5.445,5.026Z"
                fill="#4a4a4a"
                stroke="#4a4a4a"
                stroke-width="0.5"
              />
            </g>
          </svg>
          <ul class="floated-list">
            <li>تاریخ</li>
          </ul>
        </div>
        <label for="withdraw-search-btn" class="search-box" tabindex="0">
          <input
            type="search"
            placeholder="جستجو کنید"
            class="search-btn"
            id="withdraw-search-btn"
          />
          <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
        </label>
      </form>
    </div>
    <section class="box-content custom-scrollbar">
      <header class="table-row table-header">
        <span>تاریخ</span>
        <span>ساعت</span>
        <span>قیمت (تومان)</span>
        <span>کد پیگیری</span>
      </header>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <div class="table-row">
        <span class="persian-number">1400/05/02</span>
        <span class="persian-number">13:43</span>
        <span class="persian-number">1400000</span>
        <span class="persian-number">8901047</span>
      </div>
      <footer>
        <hr />
        <a href="#"> مشاهده همه </a>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
