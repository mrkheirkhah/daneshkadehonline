export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'student-panel',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
    ],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-6N54C4LD3T",
        async:true
      },
    ]
  },
  loading: {
    color: '#e13535'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/styles/stu-panel.scss"
  ],
  server: {
    port: 3002 // default: 3000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '~/plugins/vue-plyr', mode: 'client' },
    {
      src: '~/plugins/GoogleAnalytics.js',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/proxy',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': {target:'https://api.daneshkadeonline.ir/',
              pathRewrite:{'^/api/':''},
              secure:false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  }
}
