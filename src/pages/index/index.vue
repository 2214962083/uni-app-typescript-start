<template>
  <base-page>
    <my-nav-bar bg="var(--bgColor)"
                :isBack="false"
                title="首页"> </my-nav-bar>
    <view class="text-area flex flex-direction align-center">
      <text class="title">{{ title }}</text>
      <switch @change="changeTheme"
              :class="switchActive ? 'checked' : ''"
              :checked="switchActive"></switch>
      <button class="cu-btn round bg-white shadow margin-top"
              @click="goGetUser">进入用户信息页</button>
      <button class="cu-btn round bg-white shadow margin-top"
              @click="goLogin">进入登录页</button>
      <button class="cu-btn round bg-black shadow margin-top"
              @click="sendRequest">发送一个请求</button>
    </view>
    <my-tabbar :items="tabBar.items"></my-tabbar>
  </base-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Theme, Router} from '@app/enums'
import {GlobalModule} from '@app/store/module/'
import {TabbarItem} from '@app/interfaces'
import MyTabbar from '@app/components/my-tabbar.vue'
import axios from '@app/helper/request'
import {mixins} from 'vue-class-component'
import {PrimaryMixin} from '@app/mixins'

@Component({
  components: {
    MyTabbar,
  },
})
export default class extends mixins(PrimaryMixin) {
  title: string = '切换主题'
  switchActive: boolean = false
  tabBar = {
    active: 1,
    activeColor: 'var(--themeColor)',
    disactiveColor: 'var(--disactiveColor)',
    items: [
      {
        name: '首页',
        icon: 'homefill',
      },
      {
        name: '分类',
        icon: 'similar',
      },
      {
        name: '关于',
        icon: 'my',
      },
    ] as TabbarItem[],
  }

  onLoad() {}

  changeTheme() {
    console.log(GlobalModule)
    this.switchActive = true
    GlobalModule.updateTheme(this.themeClass === Theme.DARK ? Theme.DEFAULT : Theme.DARK)
  }

  goGetUser() {
    uni.navigateTo({
      url: Router.GET_USER,
    })
  }

  goLogin() {
    uni.navigateTo({
      url: Router.LOGIN,
    })
  }

  sendRequest() {
    axios.get('https://m.baidu.com').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scope>
</style>
