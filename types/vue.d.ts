import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $statusBarHeight: number
    $customBarHeight: number
    $themeClass: string
  }
}
