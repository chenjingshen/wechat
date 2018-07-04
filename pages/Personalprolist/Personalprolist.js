// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.activ
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.activ)
    let catid = options.catid
    let _this = this
    app.getuesrinfo(function (data) {
      _this.setData({
        uesrinfo: data
      })
      console.log(data)
    })
    _this.getcase(catid)
  },
  //获取数据
  getcase: function (catid) {
    let _this = this;
    app.getuesrinfo(function (data) {
      if (data) {
        wx.request({
          url: app.globalData.apiUrl+'/index.php?g=Addons&m=GuestBook&a=lists',
          // method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': app.globalData.token
          },
          data: {
            catid: catid
          },
          success: function (res) {
            console.log(res)
            _this.setData({
              otherinfo: res.data
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})