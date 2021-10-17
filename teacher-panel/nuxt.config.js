var webpack = require('webpack')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'school online teacher panel',
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
    ]
  },
  loading: {
    color: '#e13535'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/main.scss',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // chart js plugin
    {src: '@/plugins/chart.js', mode: 'client'},

    // croppie
    { src: '~/plugins/croppie.js', ssr: false },
    '@/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // for load dynamic svg
    "@nuxtjs/svg",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL : 'https://api.daneshkadeonline.ir',
    // retry: { retries: 5 }
    proxy:true
  },
  proxy: {
    '/api/': {target:'https://api.daneshkadeonline.ir/',
              pathRewrite:{'^/api/':''},
              secure: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // env:{
  //   baseUrl:process.env.BASE_URL || 'https://api.daneshkadeonline.ir/'
  // }
}
