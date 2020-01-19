<template>
  <view class="cu-bar tabbar my-tabbar"
        :class="{'border-top': border, 'shadow': shadow}">
    <view class="action"
          v-for="(tab, index) in items"
          :key="tab.name"
          @click="changeTab(index)">
      <view :class="'cuIcon-' + tab.icon"
            :style="{color: tabBarItemColor(index)}"></view>
      <view :style="{color: tabBarItemColor(index)}">{{ tab.name }}</view>
    </view>
  </view>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator'
import {TabbarItem} from '@app/interfaces'
@Component({
  name: 'my-tabbar',
})
export default class extends Vue {
  /**
   * 是否显示 border-top
   */
  @Prop({type: [Boolean], default: false})
  readonly border: boolean

  /**
   * 是否显示阴影
   */
  @Prop({type: [Boolean], default: true})
  readonly shadow: boolean

  /**
   * 当前焦点索引
   */
  @Prop({type: [Number], default: 0})
  readonly active: number

  /**
   * 焦点颜色
   */
  @Prop({type: [String], default: 'var(--themeColor)'})
  readonly activeColor: string

  /**
   * 失去焦点的颜色
   */
  @Prop({type: [String], default: 'var(--disactiveColor)'})
  readonly disactiveColor: string

  /**
   * tabbar 的 icon 、文字 等
   */
  @Prop({type: [Array], default: []})
  readonly items: TabbarItem[]

  /**
   * 当前焦点索引的 copy 值（因为 prop 不能直接改）
   */
  Active: number = this.active

  /**
   * 同步 prop 里面的 active 值
   */
  @Watch('active', {immediate: true})
  onActiveChange(newValue: number) {
    this.Active = newValue
  }

  /**
   * 获取 tabbar item 文字图标颜色
   * @param index tabbar item 索引
   * @returns 颜色
   */
  tabBarItemColor(index: number) {
    return this.Active === index ? this.activeColor : this.disactiveColor
  }

  /**
   * 创建 change 事件
   * @param index 当前焦点索引
   * @returns 当前焦点索引
   */
  @Emit('change')
  changeTab(index: number) {
    this.Active = index
    return index
  }
}
</script>
<style lang="scss" scope>
@import '~@app/styles/color-ui-main';

.my-tabbar {
  width: 750rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: var(--bgColor);
}
.border-top {
  border-top: 1rpx solid var(--borderColor);
}
.shadow {
  box-shadow: 0 0.5px 36px 0 var(--alpha-dark-90);
}
</style>