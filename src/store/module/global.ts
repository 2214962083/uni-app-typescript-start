import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@app/store'
import {Theme} from '@app/enums'

@Module({
  name: 'global',
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  store,
})
export class Global extends VuexModule {

  /**
   * 当前主题名字
   */
  theme: Theme = Theme.DEFAULT

  /**
   * 同步修改主题
   * @param theme 主题名字
   */
  @Mutation
  updateTheme(theme: Theme) {
    this.theme = theme
    /**
     * 白色状态栏文字主题集
     */
    const whiteStatusBarTextThemes: Theme[] = [Theme.DARK]
    const frontColor = whiteStatusBarTextThemes.includes(theme) ? '#ffffff' : '#000000'
    uni.setNavigationBarColor({
      frontColor,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    })
  }
}
export const GlobalModule = getModule(Global)
