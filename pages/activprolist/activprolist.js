// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.activ,
    pldate: [],
    route: "pages/activprolist/activprolist"
  },

  onLoad: function (options) {
    // console.log(util.activ)
    let _this = this;
    _this.getactivact()
  },
  gocartlist: function () {
    wx.navigateTo({
      url: '../activactivcard/activactivcard',
    })
  },
  //获取优惠活动
  getactivact: function () {
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
      data: {
        catid: 54,
        num: 6,
        page: 1
      },
      success: function (res) {
        for (let key in res.data) {
          // art[key].date = new Data(art[key].date * 1000)
          var n = parseInt(res.data[key].updatetime) * 1000;
          var date = new Date(n);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var H = (date.getHours() < 10 ? '0' + date.getMonth() : date.getMonth()) + ':';
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
          var plt = Y + M + D
          var pls = H + m
          _this.data.pldate.push(plt)
        }
        _this.setData({
          pldate: _this.data.pldate,
          activact: res.data
        })
        console.log(res.data)
      }
    })
  },
  goprolist:function(){
    let _this = this;
    wx.navigateTo({
      url: "../activactivlist/activactivlist"
    })
  },
  godeflpro:function(e){
    let _this = this;
    let catid = e.target.dataset.catid
    let id = e.target.dataset.id
    console.log(catid,id)
    wx.navigateTo({
      url: "../activactivdefault/activactivdefault?catid=" + catid + "&id=" + id
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