<template>
  <view class="content" :class="themeClass">
    <nav-bar bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">导航栏</block>
    </nav-bar>
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  title: string = 'Hello'
  onLoad() {
    console.log('index')
    console.log(this)
  }

  get themeClass() {
    return this.$themeClass
  }
}
</script>

<style lang="scss" scope>
.content {
  @include themed() {
    color: th('themeColor');
  }
}
</style>
