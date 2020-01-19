<template>
  <view class="login-wrapper">
    <view class="login">
      <input type="text">
      <input type="text">
      <button>登录</button>
      <button>注册</button>
    </view>
  </view>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator'
import {GlobalModule} from '@app/store/module'

@Component({
  name: 'base-page',
})
export default class extends Vue {
  get themeClass() {
    return GlobalModule.theme
  }
}
</script>
<style lang="scss" scope>
@mixin flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-wrapper {
  width: 750rpx;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  @include flex-center;
  .login {
    width: 500rpx;
    padding: 20px;
    background-color: var(--bgColor);
    @include flex-center;
  }
}
</style>