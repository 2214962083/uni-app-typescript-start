import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@app/store'
import { Permission } from '@app/enums'

@Module({
  name: 'user',
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  store,
})
export class User extends VuexModule {
  /**
   * 登录令牌
   */
  token: string = ''

  /**
   * 用户权限
   */
  permissions: Permission[] = []

  /**
   * 同步修改 token
   * @param token 登录令牌
   */
  @Mutation
  updateToken(token: string) {
    this.token = token
  }

  /**
   * 同步修改用户权限
   * @param permission 用户权限 
   */
  @Mutation
  updatePermission(permissions: Permission[]) {
    this.permissions = permissions
  }

  /**
   * 异步修改 token
   * @param token 登录令牌
   */
  @Action({commit: 'updateToken'})
  updateTokenAsync(token: string) {
    return token
  }
}
export const UserModule = getModule(User)
