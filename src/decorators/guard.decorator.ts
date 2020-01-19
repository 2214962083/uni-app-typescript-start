import {Vue} from 'vue-property-decorator'
import {createDecorator, VueDecorator} from 'vue-class-component'
import {Permission, Router} from '@app/enums'
import {UserModule} from '@app/store/module'
import {intersection, isFunction} from 'lodash'
import {getCurrentPath} from '@app/helper/util-router'
import {ComponentOptions} from 'vue/types/umd'

interface FnType {
  type: string
  prop: any
  value: Function | undefined
}

const getFnType = (options: ComponentOptions<Vue>, key: string): FnType => {
  const fnTypes: FnType[] = [
    {
      type: 'life',
      prop: options,
      value: options[key as 'mounted'] as Function,
    },
    {
      type: 'methods',
      prop: options.methods as object,
      value: options.methods && (options.methods[key] as Function),
    },
    {
      type: 'computed',
      prop: options.computed as object,
      value: options.computed && (options.computed[key] as Function),
    },
  ]
  return fnTypes.find(fnType => isFunction(fnType.value)) as FnType
}

/**
 * 路由守卫装饰器
 * @param permissions 权限
 */
export const Guard = (...permissions: Permission[]): VueDecorator =>
  createDecorator((options: ComponentOptions<Vue>, key: string): void => {
    let oldFn: Function = getFnType(options, key).value as Function
    getFnType(options, key).prop[key] = function(this: typeof oldFn, ...args: any[]) {
      if (!UserModule.token) {
        // 登录去吧骚年
        uni.redirectTo({
          url: `${Router.LOGIN}?redirect=${getCurrentPath()}`,
        })
        return
      }
      const userPermissions = UserModule.permissions
      // 判断用户的角色权限是否和装饰器标注的权限有交集
      if (intersection(permissions, userPermissions).length === 0) {
        uni.navigateBack()
        uni.showToast({
          title: '你没权限访问该页面',
        })
        return
      }
      oldFn.apply(this, args)
    }
  })
