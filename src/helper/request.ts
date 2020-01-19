import axios from '@app/helper/axios/index.js'
import {AxiosStatic, AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios'
import {UserModule} from '@app/store/module'
import {Router} from '@app/enums'
import {getCurrentPath} from '@app/helper/util-router'

/**
 * 错误提示函数
 * @param msg 错误信息
 */
const tip = (msg: string | number) => {
  uni.showToast({
    title: String(msg),
    duration: 1500,
  })
}

/**
 * 跳到登录页并携带上当前路由
 */
const goToLogin = () => {
  uni.redirectTo({
    url: `${Router.LOGIN}?redirect=${getCurrentPath()}`,
  })
}

/**
 * 请求失败后错误的统一处理
 * @param status 状态
 * @param res 响应
 */
const errorHandle = (status: number, res: AxiosResponse) => {
  switch (status) {
    /**
     * 错误的请求
     */
    case 400:
      tip(res.data.message || '错误的请求')
      break

    /**
     * 登录过期或没登录
     */
    case 401:
      tip(res.data.message || '请先登录')
      UserModule.updateToken('')
      setTimeout(() => goToLogin(), 1000)
      break

    /**
     * 没权限操作
     */
    case 403:
      tip(res.data.message || '你没权限执行该操作')
      break

    /**
     * 访问api太频繁
     */
    case 429:
      tip('你操作太频繁，过段时间再访问吧')
      break

    /**
     * 资源不存在
     */
    case 404:
      tip(res.data.message || '请求的资源不存在')
      break

    /**
     * 该操作不生效
     */
    case 501:
      tip(res.data.message || '该操作不生效，请稍后再试')
      break

    /**
     * 服务器处理不了
     */
    case 503:
      tip(res.data.message || '服务器出了点问题，请稍后再试')
      break

    default:
      break
  }
}

/**
 * axios拦截
 * 创建实例
 */
const instance: AxiosInstance = (axios as AxiosStatic).create({
  timeout: 1000 * 12,
})

/**
 * 设置post、put、patch的请求头
 */
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
instance.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

/**
 * 请求拦截，若有token，则携带上
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 登录流程控制中，根据本地是否存在token判断用户的登录情况
     * 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
     * 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
     * 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
     */
    const token = UserModule.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    Promise.reject(error)
  },
)

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  /**
   * 请求成功, 默认条件status >= 200 && status < 300;
   */
  (res: AxiosResponse) => {
    return Promise.resolve(res)
  },
  error => {
    const {response} = error
    const isResponse = (value: any): value is AxiosResponse => Boolean(value)
    if (isResponse(response)) {
      /**
       * 请求已发出，但是不在2xx的范围
       */
      errorHandle(response.status, response)
      return Promise.reject(response)
    } else {
      /**
       * 处理断网的情况
       */
      if (!window.navigator.onLine) {
        tip('请检查你的网络')
      } else {
        return Promise.reject(error)
      }
    }
  },
)

export default instance
