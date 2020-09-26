import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* import bootstrap from 'bootstrap' */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/css/style.scss'
import VuePapaParse from 'vue-papa-parse'

Vue.use(VuePapaParse)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store, 
  render: h => h(App),
}).$mount('#app')
