
/** 获取个人中心信息 */
export function fetchPerson() {
  return wx.cloud.callFunction({
    name: 'user',
    data: {
      type: 'get'
    }
  })
}
