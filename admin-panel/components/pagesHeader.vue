<template>
  <header class="dashboard-header">
    <span> داشبورد </span>
    <div class="left-section">
      <div class="vertical-line"></div>
      <button href="#" class="logout-btn dashboard-btn" @click.prevent="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20.346"
          height="20.278"
          viewBox="0 0 20.346 20.278"
        >
          <g id="logout" transform="translate(0 -0.85)">
            <g id="Group_192" data-name="Group 192" transform="translate(0 0.85)">
              <g id="Group_191" data-name="Group 191">
                <path
                  id="Path_95"
                  data-name="Path 95"
                  class="cls-1"
                  d="M10.139,19.438h-7.6a.845.845,0,0,1-.845-.845V3.385a.845.845,0,0,1,.845-.845h7.6a.845.845,0,0,0,0-1.69h-7.6A2.538,2.538,0,0,0,0,3.385V18.593a2.538,2.538,0,0,0,2.535,2.535h7.6a.845.845,0,0,0,0-1.69Z"
                  transform="translate(0 -0.85)"
                  fill="#202939"
                />
              </g>
            </g>
            <g id="Group_194" data-name="Group 194" transform="translate(6.759 5.075)">
              <g id="Group_193" data-name="Group 193">
                <path
                  id="Path_96"
                  data-name="Path 96"
                  class="cls-1"
                  d="M183.435,112.477l-5.137-5.07a.845.845,0,1,0-1.186,1.2l3.671,3.623h-9.837a.845.845,0,0,0,0,1.69h9.837l-3.671,3.623a.845.845,0,1,0,1.186,1.2l5.137-5.07a.845.845,0,0,0,0-1.2Z"
                  transform="translate(-170.1 -107.165)"
                  fill="#202939"
                />
              </g>
            </g>
          </g>
        </svg>
        <a href="" title="خروج"> خروج </a>
      </button>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    async logout() {
      const logout = await this.$axios.get("/api/Admin/AdminAccount/LogOut", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.$store.dispatch("login/clearToken");
      this.$router.push("/login");
    },
  },
};
</script>
