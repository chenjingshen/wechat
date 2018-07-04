// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.activ,
    pldate: []
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
  getactivact: function (ismore) {
    let _this = this;
    wx.showLoading({
      title: '加载数据中',
      mask: 'true'
    })
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
      data: {
        catid: 53,
        num: 100,
        page: 1
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        let newdata = ismore ? _this.data.newdata : []
        let time = ismore ? _this.data.time : []
        if (res.data.length == 0 | JSON.stringify(res.data) == "{}") {
          wx.showLoading({
            title: '没有多余产品了...',
            mask: 'true'
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        }
        for (let key in res.data) {
          newdata.push(res.data[key])
          time.push(_this.timestampToTime(res.data[key].endtime))
        }
        _this.setData({
          newdata: newdata,
          time: time
        })
      }
    })
  },
  goidcard: function (e) {
    let _this = this;
    let relation = []
    relation[0] = e.target.dataset.modelid
    relation[1] = e.target.dataset.id
    wx.navigateTo({
      url: '../Personalcarddefault/Personalcarddefault?relation=' + relation
    })
  },
  //s时间处理
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D
  },
  gohuodong: function () {
    wx.navigateTo({
      url: '../activprolist/activprolist',
    })
  },
  goproduct: function () {
    wx.navigateTo({
      url: '../activactivlist/activactivlist',
    })
  },
  gocartlist:function(){
    wx.navigateTo({
      url: '../activactivcard/activactivcard',
    })
  },
  goprodefaulf: function (e) {
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