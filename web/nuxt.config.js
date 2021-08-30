import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'
dotenv.config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - XXG0',
    title: '白云轻舍',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" }
      // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons'}
    ]
  },
  server: {
    port: 3004,     // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/iconfont.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/assets/js/iconfont.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // 表示开启代理
    credentials: true,
    prefix: '/api', // 表示给请求url加个前缀 /api
  },
  proxy: {
    '/api/bz': {
      target: 'https://www.bilibili.com/index/ding.json',
      changeOrigin: true,
      pathRewrite: {
        '^/api/bz': ''
      }
    },
    '/api/findphone': {
      target: 'https://cxx.yun7.me/qqapi',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findphone': ''
      }
    },
    '/api/findqq': {
      target: 'https://cxx.yun7.me/qqphone',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findqq': ''
      }
    },
    '/api/findwbphone': {
      target: 'https://cxx.yun7.me/wbapi',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findwbphone': ''
      }
    },
    '/api/findimg': {
      target: 'https://api.xiaobaibk.com/api/qq.php',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findimg': ''
      }
    },
    '/api/findbea': {
      target: 'https://api.xiaobaibk.com/api/pic/acg-1/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findbea': ''
      },
    },
    '/api/findtxt': {
      target: 'https://api.xiaobaibk.com/api/yiyan.php',
      changeOrigin: true,
      pathRewrite: {
        '^/api/findtxt': ''
      },
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'http://aoau.top:3006/auth/login' },
          logout: { url: 'http://aoau.top:3006/auth/logout' },
          user: { url: 'http://aoau.top:3006/auth/user', propertyName: false }
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
