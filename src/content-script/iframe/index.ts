import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import '../../assets/base.scss'
import App from './app.vue'
import './index.scss'

import 'vuetify/styles'
import { createVuetify  } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#000',
    surface: '#FFFFFF',
    primary: '#0f0f0f',
    'primary-darken-1': '#3700B3',
    secondary: '#787873',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#09d65d',
    warning: '#FB8C00',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },

})

routes.push({
  path: '/',
  redirect: '/iframe',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/iframe')
  }

  next()
})

createApp(App).use(router).use(vuetify).mount('#app')
