import {Router} from '@app/enums'

/**
 * 获取当前页面路由 url
 * @returns 当前页面路由 url
 */
export const getCurrentPath = (): Router => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage.route as Router
}
