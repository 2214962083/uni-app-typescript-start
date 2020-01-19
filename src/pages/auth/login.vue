<template>
  <base-page>
    <my-nav-bar bg="var(--bgColor)"
                title="登录"> </my-nav-bar>
  </base-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Theme} from '@app/enums'
import {GlobalModule, UserModule} from '@app/store/module/'
import {PrimaryMixin} from '@app/mixins'
import {mixins} from 'vue-class-component'

@Component({
  components: {},
})
export default class extends mixins(PrimaryMixin) {
  onLoad() {}
}
</script>

<style lang="scss" scope></style>
