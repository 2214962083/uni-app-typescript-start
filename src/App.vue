<script lang="ts">
import Vue from 'vue'
import store from './store'

export default Vue.extend({
  mpType: 'app',
  store,
  onLaunch() {
    /**
     * 传递参数给自定义顶部导航条
     */
    uni.getSystemInfo({
      success(e) {
        console.log(e)
        /**
         * @param statusBarHeight 状态栏的高度，单位：px
         * @param titleBarHeight 标题栏高度，单位：px
         */
        const {statusBarHeight = 20, titleBarHeight = 0} = e

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
        /**
         * @param bottom 小程序右上角胶囊按钮下边界坐标，单位：px
         * @param top 小程序右上角胶囊按钮上边界坐标，单位：px
         */
        const {bottom = 58, top = 26} = uni.getMenuButtonBoundingClientRect()
        Vue.prototype.$customBarHeight = bottom + top - statusBarHeight
        //#endif

        //阿里小程序
        //#ifdef MP-ALIPAY
        Vue.prototype.$statusBarHeight = statusBarHeight
        Vue.prototype.$customBarHeight = statusBarHeight + titleBarHeight
        //#endif
      },
    })
  },
  onShow() {},
  onHide() {},
})
</script>

<style lang="scss">
// 自定义主题
@import '~@app/styles/themes/index.scss';
</style>

<style>
/*每个页面公共css */

/* color-ui */
@import url('styles/color-ui-animation.css');
@import url('styles/color-ui-icon.css');
@import url('styles/color-ui-main-theme.css');

/* 阿里 icon 库 */
/* @import url('styles/iconfont.css'); */
</style>
