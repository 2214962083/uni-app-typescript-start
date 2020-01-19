import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 状态栏的高度，单位：px
     */
    $statusBarHeight: number
    /**
     * 自定义顶部导航条高度，单位：px
     */
    $customBarHeight: number
  }
}
