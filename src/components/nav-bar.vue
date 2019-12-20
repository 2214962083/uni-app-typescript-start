<template>
  <view>
    <view class="cu-custom" :style="[{ height: customBarHeight + 'px' }]">
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]"
      >
        <view class="action" @tap="goBack" v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content" :style="[{ top: statusBarHeight + 'px' }]">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'nav-bar'
})
export default class extends Vue {
  @Prop({ type: String, default: '' })
  readonly bgColor: string

  @Prop({ type: [Boolean, String], default: false })
  readonly isBack: boolean | string

  @Prop({ type: String, default: '' })
  readonly bgImage: string

  statusBarHeight: number = this.$statusBarHeight
  customBarHeight: number = this.$customBarHeight

  mounted() {
    console.log('nav-bar')
    console.log(this)
  }

  get style() {
    const { statusBarHeight, customBarHeight, bgImage } = this
    let style = `height:${customBarHeight}px;padding-top:${statusBarHeight}px;`
    bgImage && (style = `${style}background-image:url(${bgImage});`)
    return style
  }

  goBack() {
    // if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
    //   let url = "/" + __wxConfig.pages[0];
    //   return uni.redirectTo({ url });
    // }
    uni.navigateBack({
      delta: 1
    })
  }
}
</script>
<style lang="scss" scope></style>
