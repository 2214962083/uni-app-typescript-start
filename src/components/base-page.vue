<template>
  <view class="page"
        :class="themeClass">
    <slot></slot>
    <!-- <my-login></my-login> -->
  </view>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator'
import {GlobalModule} from '@app/store/module'
import MyLogin from '@app/components/my-login.vue'

@Component({
  name: 'base-page',
  components: {
    MyLogin,
  },
})
export default class extends Vue {
  get themeClass() {
    return GlobalModule.theme
  }
}
</script>
<style lang="scss" scope>
.page {
  color: var(--textColor);
  background-color: var(--light100);
  min-height: 100vh;
}
</style>
