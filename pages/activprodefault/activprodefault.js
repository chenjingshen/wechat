// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp()
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
    let _this = this;
    let actprodefaulfdata = app.actprodefaulfdata
    _this.setData({
      actprodefaulfdata: actprodefaulfdata,
      catid: actprodefaulfdata.catid
    })
    console.log(app.actprodefaulfdata)
    _this.getlsitpro()
  },
  changepro:function(e){
    let _this = this;
    let index = e.target.dataset.index
    _this.setData({
      actprodefaulfdata: _this.data.lsitpro[index]
    })
  },
  goactiv:function(){
    wx.navigateTo({
      url: "../activactivlist/activactivlist"
    })
  },
  // 获取产品列表
   getlsitpro:function(){
     let _this = this;
     wx.request({
       url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
       data: {
         catid: _this.data.catid,
         page:1,
         num:3
       },
       success: function (res) {
         _this.setData({
           lsitpro: res.data
         })
         console.log(res.data)
       }
     })
   },
  //领取点卷
  lqdian:function(){
    let _this = this;
    app.lqucard({
      catid: app.actprodefaulfdata.catid,
      id: app.actprodefaulfdata.id
    },function(_d){
      console.log(_d)
      wx.showToast({
        title: _d.data.info,
        duration: 1000
      })
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