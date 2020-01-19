import {Component, Vue} from 'vue-property-decorator'
import {GlobalModule} from '@app/store/module'

@Component
export class PrimaryMixin extends Vue {
  get themeClass() {
    return GlobalModule.theme
  }
}
