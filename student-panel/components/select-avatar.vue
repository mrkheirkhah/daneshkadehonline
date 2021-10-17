<template>
  <div class="basic-modal select-avatar">
    <div class="content-box">
      <header>
        <div class="empty"></div>
        <h2 class="title">انتخاب اواتار</h2>
        <button class="close-btn" @click="$parent.showAvatar">&times;</button>
      </header>
      <div class="avatars-container">
        <img
          src="@/static/images/teacher-profile-image.png"
          class="avatar-image"
          alt="آواتار"
        />
        <img
          src="@/static/images/teacher-profile-image.png"
          class="avatar-image"
          alt="آواتار"
        />
        <img
          src="@/static/images/teacher-profile-image.png"
          class="avatar-image"
          alt="آواتار"
        />
        <img
          src="@/static/images/teacher-profile-image.png"
          class="avatar-image"
          alt="آواتار"
        />
        <img
          src="@/static/images/teacher-profile-image.png"
          class="avatar-image"
          alt="آواتار"
        />
      </div>
      <form action="#">
        <button class="form-btn submit-avatar lilac">انتخاب</button>
      </form>
    </div>
  </div>
</template>
