// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.activ,
    pldate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.activ)
    let _this = this;
    _this.getactivact()
  },
  //获取优惠活动
  getactivact: function () {
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
      data: {
        catid: 55,
        num: 6,
        page: 1
      },
      success: function (res) {
        _this.setData({
          activact: res.data
        })
        console.log(res.data)
      }
    })
  },
  gohuodong:function(){
    wx.navigateTo({
      url: '../activprolist/activprolist',
    })
  },
  gocartlist: function () {
    wx.navigateTo({
      url: '../activactivcard/activactivcard',
    })
  },
  goprodefaulf:function(e){
    let _this = this;
    let index = e.target.dataset.index
    app.actprodefaulfdata = _this.data.activact[index]
    wx.navigateTo({
      url: '../activprodefault/activprodefault',
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