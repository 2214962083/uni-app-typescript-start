<script lang="ts">
import Vue from 'vue'
import store from './store'

export default Vue.extend({
  mpType: 'app',
  store,
  onLaunch() {
    Vue.prototype.$themeClass = 'theme--default'
    uni.getSystemInfo({
      success(e) {
        const { statusBarHeight = 0, titleBarHeight = 0 } = e

        //小程序
        //#ifndef MP
        Vue.prototype.$statusBarHeight = statusBarHeight
        if (e.platform === 'android') {
          Vue.prototype.$customBarHeight = statusBarHeight + 50
        } else {
          Vue.prototype.$customBarHeight = statusBarHeight + 45
        }
        //#endif

        //微信小程序
        //#ifdef MP-WEIXIN
        Vue.prototype.$statusBarHeight = statusBarHeight
        const { bottom = 0, top = 0 } = uni.getMenuButtonBoundingClientRect()
        Vue.prototype.$customBarHeight = bottom + top - statusBarHeight
        //#endif

        //阿里小程序
        //#ifdef MP-ALIPAY
        Vue.prototype.$statusBarHeight = statusBarHeight
        Vue.prototype.$customBarHeight = statusBarHeight + titleBarHeight
        //#endif
      }
    })
  },
  onShow() {},
  onHide() {}
})
</script>

<style>
/*每个页面公共css */
@import url('styles/color-ui-main.css');
@import url('styles/color-ui-icon.css');
@import url('styles/color-ui-animation.css');
</style>
