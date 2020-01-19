import Vue from 'vue'
import App from './App.vue'
import MyNavBar from '@app/components/my-nav-bar.vue'
import BasePage from '@app/components/base-page.vue'

Vue.config.productionTip = false
Vue.component('my-nav-bar', MyNavBar)
Vue.component('base-page', BasePage)

new App().$mount()
