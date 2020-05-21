const isProd = process.env.NODE_ENV === 'production'

const app = {
  name: 'OutreachFinder',
  description: 'Connecting communities for the greater good',
  social: {},
  url: 'https://localhost:3000/',
  cover: '/cover/wide.png'
}

export default {
  components: true,
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: app.name,
    bodyAttrs: {
      class: 'bg-white'
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2a1b3c' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/vendors.scss',
    '@/assets/css/animation.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/firebase',
    '~/plugins/router',
    '~/plugins/directives'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sentry',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'portal-vue/nuxt',
    '@nuxtjs/device',
    'nuxt-i18n'
  ],
  purgeCSS: {
    enabled: false
  },
  pwa: {
    workbox: {
      offline: true,
      dev: false,
      pagesURLPattern: '/.*'
    },
    meta: {
      name: app.name,
      description: app.description,
      ogHost: app.url,
      ogImage: app.cover,
      nativeUI: true,
      twitterSite: '@' + app.social.twitter
    },
    manifest: {
      name: app.name,
      short_name: app.name,
      start_url: '/app/?standalone=true',
      background_color: '#ece3f7',
      lang: 'en'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'

      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      })

      config.module.rules.push({
        test: /\.yml$/,
        use: 'js-yaml-loader'
      })
    }
  },
  env: {
    app,
    firebase: {
      config: {
        apiKey: 'AIzaSyDdL-N7ghXeM33-D5ZZKR9g25NLJLHWMec',
        authDomain: 'outreachfinder-200505.firebaseapp.com',
        databaseURL: 'https://outreachfinder-200505.firebaseio.com',
        projectId: 'outreachfinder-200505',
        storageBucket: 'outreachfinder-200505.appspot.com',
        messagingSenderId: '160728570663',
        appId: '1:160728570663:web:01e744dfd37c6e40b06702',
        measurementId: 'G-6E7D38489X'
      },
      services: {
        auth: true,
        firestore: true,
        analytics: true
      }
    }
  },
  sentry: {
    disabled: !isProd,
    dsn:
      'https://981927b1b91843309cab05b9bd3900ef@o340470.ingest.sentry.io/5224350'
  },
  robots: [
    {
      UserAgent: '*',
      Allow: '/'
    },
    {
      UserAgent: '*',
      Disallow: '/app'
    }
  ],
  sitemap: {
    hostname: app.url,
    routes: ['/']
  }
}
