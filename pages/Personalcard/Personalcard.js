// pages/PersonalCenter/PersonalCenter.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.personalcenter
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.personalcenter)
    let _this = this
    app.getuesrinfo(function (data) {
       if(data){
          _this.setData({
            uesrinfo: data
          })
          app.getcard({
            page:1,
            num:8
          },function(d){
            console.log(d)
            let uescard = []
            let time = []
            for (let key in d.data.data){
              uescard.push(d.data.data[key])
              time.push(_this.timestampToTime(d.data.data[key].info.endtime))
             }
             _this.setData({
               uescard: uescard,
               time: time
             })
          })
      }
      console.log(data)
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
  goidcard:function(e){
    let _this = this;
    let relation = []
    relation[0] = e.target.dataset.modelid
    relation[1] = e.target.dataset.id
    wx.navigateTo({
      url: '../Personalcarddefault/Personalcarddefault?relation=' + relation
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