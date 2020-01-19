<template>
  <view>
    <view class="nav-bar-wrapper" :style="{height: customBarHeight + 'px'}">
      <view class="nav-bar" :style="style">
        <!-- 返回 -->
        <view class="left" @tap="goBack" v-if="showBack">
          <text class="icon icon-iosarrowback"></text>
          <text>{{ backText }}</text>
        </view>
        <!-- 左插槽 -->
        <slot name="left" v-else></slot>
        <!-- 中间 -->
        <view class="center" :style="{top: statusBarHeight + 'px'}">
          <!-- 标题 -->
          <text v-if="title">{{ title }}</text>
          <slot name="title" v-else></slot>
        </view>
        <!-- 右插槽 -->
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({
  name: 'my-nav-bar',
})
export default class extends Vue {
  /**
   * 标题
   */
  @Prop({type: String, default: ''})
  readonly title: string

  /**
   * 返回按钮文字
   */
  @Prop({type: String, default: '返回'})
  readonly backText: string

  /**
   * 背景
   */
  @Prop({type: String, default: ''})
  readonly bg: string

  /**
   * 是否显示返回
   */
  @Prop({type: [Boolean], default: true})
  readonly showBack: boolean

  /**
   * 是否显示 border
   */
  @Prop({type: [Boolean], default: true})
  readonly border: boolean

  /**
   * border color
   */
  @Prop({type: [String], default: 'var(--borderColor)'})
  readonly borderColor: string

  /**
   * 状态栏高度，单位：px
   */
  statusBarHeight: number = this.$statusBarHeight

  /**
   * 顶部导航条最终高度，单位：px
   */
  customBarHeight: number = this.$customBarHeight

  /**
   * 生成样式
   * @returns 状态条样式
   */
  get style() {
    const {statusBarHeight, customBarHeight, bg, border, borderColor} = this
    let style = `height:${customBarHeight}px;padding-top:${statusBarHeight}px;`
    bg && (style = `${style}background:${bg};`)
    border && (style = `${style}border-bottom: 1rpx solid ${borderColor}`)
    return style
  }

  /**
   * 返回
   */
  goBack() {
    // if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
    //   let url = "/" + __wxConfig.pages[0];
    //   return uni.redirectTo({ url });
    // }
    uni.navigateBack({
      delta: 1,
    })
  }
}
</script>
<style lang="scss" scope>
.nav-bar-wrapper {
  width: 750rpx;
  .nav-bar {
    width: 750rpx;
    display: flex;
    align-items: center;
    .left {
      width: 220rpx;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .icon {
        margin: 0 0.3em;
        font-size: 18px;
      }
    }
    .center {
      width: 310rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  }
  text {
    font-size: 16px;
    color: var(--textColor);
  }
}
</style>
