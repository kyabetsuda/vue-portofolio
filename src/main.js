import Vue from 'vue'
import Articles from './Articles.vue'
import Article from './Article.vue'
import Router from 'vue-router'
import Top from './Top.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Router
Vue.use(Router)

// Install BootstrapVue
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Articles
    },    
    {
      path: '/category/:value',
      name: 'category',
      component: Articles,
    },
    {
      path: '/post/:value',
      name: 'post',
      component: Article
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(Top),
  router
}).$mount('#app')



