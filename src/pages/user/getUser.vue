<template>
  <base-page>
    <my-nav-bar bg="var(--bgColor)"
                title="用户页"> </my-nav-bar>
  </base-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Theme, Permission} from '@app/enums'
import {GlobalModule, UserModule} from '@app/store/module/'
import {Guard} from '@app/decorators/guard.decorator'
import {mixins} from 'vue-class-component'
import {PrimaryMixin} from '@app/mixins'

@Component({
  components: {},
})
export default class extends mixins(PrimaryMixin) {
  msg = 'hello'
  @Guard(Permission.GET_USER_INFO)
  fuck() {}

  @Guard(Permission.GET_USER_INFO)
  mounted() {}
}
</script>

<style lang="scss" scope></style>
