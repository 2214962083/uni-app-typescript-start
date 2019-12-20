import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'global',
  namespaced: true,
  stateFactory: true
})
export default class Global extends VuexModule {
  msg: string = 'hello'

  @Mutation
  updateMsg(payload: string) {
    this.msg = payload
  }
  @Action({ commit: 'updateMsg' })
  updateMsgAsync(payload: string) {
    return payload
  }
}
