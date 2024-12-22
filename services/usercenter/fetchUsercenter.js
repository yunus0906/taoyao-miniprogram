
/** 获取个人中心信息 */
export function fetchUserCenter() {
  return wx.cloud.callFunction({
    name: 'login',
  })
}