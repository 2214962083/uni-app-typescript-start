import Vue from 'vue'
import App from './App.vue'
import navBar from './components/nav-bar.vue'
import './styles/color.scss'

Vue.config.productionTip = false
Vue.component('nav-bar', navBar)

new App().$mount()

// const app = new Vue({
//   store,
//   ...App
// })
// app.$mount()
