export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'admin-panel',
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
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
  },
  loading: {
    color: '#e13535'
  },
  components:true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],
  server: {
    port: 3001 // default: 3000
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/chart.js', mode: 'client'},
    { src: '@/plugins/croppie.js', ssr: false },
    '@/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [ 
    '@alireza-ab/vue-persian-datepicker/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    'vue-sweetalert2/nuxt',
    
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': {target:'https://api.daneshkadeonline.ir/',
              pathRewrite:{'^/api/':''},
              secure: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
