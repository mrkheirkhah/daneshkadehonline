export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "student-panel",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "theme-color", content: "#cf0000" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content:
          "دانشکده آنلاین بزرگترین پلتفرم آموزشی در ایران بر بستر اینترنت بر پایه اشتراک هفتگی به همراه هزاران ساعت محتوای آموزشی اختصاصی در زمینه های یادگیری برنامه نویسی ، زبان های خارجی ، دروس آکادمیک ، ریاضی ، فیزیک و مهارت های مربوط به کسبو کار"
      },
      {
        hid: "og_title",
        name: "og:title",
        content: "دانشکده آنلاین"
      },
      {
        hid: "og_description",
        name: "og:description",
        content:
          "دانشکده آنلاین بزرگترین پلتفرم آموزشی در ایران بر بستر اینترنت بر پایه اشتراک هفتگی به همراه هزاران ساعت محتوای آموزشی اختصاصی در زمینه های یادگیری برنامه نویسی ، زبان های خارجی ، دروس آکادمیک ، ریاضی ، فیزیک و مهارت های مربوط به کسبو کار"
      },
      {
        hid: "og_image",
        name: "og:image",
        content: "https://daneshkadeonline.ir/_nuxt/img/logo.ee54853.png"
      },
      {
        hid: "og_site_name",
        name: "og:site_name",
        content: "daneshkadeonline"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-6N54C4LD3T",
        async: true
      },
      {
        hid: "yektanet-script",
        innerHTML: `
          !function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-5A0MB9l9"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/5A0MB9l9/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
        `,
        type: "text/javascript",
        charset: "utf-8",
        async: true,
      }
    ]
  },
  loading: {
    color: "#e13535"
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/stu-panel.scss"],
  server: {
    port: 3002 // default: 3000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios.js",
    { src: "@/plugins/vue-awesome-swiper", mode: "client" },
    { src: "~/plugins/vue-plyr", mode: "client" },
    {
      src: "~/plugins/GoogleAnalytics.js",
      mode: "client"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "vue-sweetalert2/nuxt",
    "cookie-universal-nuxt",
    "@nuxtjs/proxy"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": {
      target: "https://api.daneshkadeonline.ir/",
      pathRewrite: { "^/api/": "" },
      secure: false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }]
      ]
    }
  }
};
