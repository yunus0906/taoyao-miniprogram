// pages/wecaht/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '"<p style="text-align: center">因账号同时添加人数过多如有出现异常提示</p><p style="text-align: center">属正常情况不用担心</p><p style="text-align: center">可以点击下方按钮复制微信号添加</p>"',
    selectedImage: 'cloud://taoyao-5gv1osvt9d19db6b.7461-taoyao-5gv1osvt9d19db6b-1331326078/wechat.jpg', // 随机选中的图片
    selectedAccount: 'taoyaocr6688' // 对应的微信号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 调用云函数
    wx.cloud.callFunction({
      name: 'wechat',
      success: (res) => {
        if (res.result.code === 200) {
          const { info, image, account } = res.result.data;
          const randomIndex = Math.floor(Math.random() * image.length);
          this.setData({
            info,
            selectedImage: image[randomIndex],
            selectedAccount: account[randomIndex]
          });
        } else {
          wx.showToast({
            title: res.result.message || '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('云函数调用失败', err);
        wx.showToast({
          title: '云函数调用失败',
          icon: 'none'
        });
      }
    });
  },

  // 复制微信号
  handleDisagree() {
    wx.setClipboardData({
      data: this.data.selectedAccount,
      success() {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        });
      },
      fail(e){
        console.log(e);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})