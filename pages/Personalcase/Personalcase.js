// pages/indexteam/indexteam.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.indexteam
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    app.getuesrinfo(function (data) {
      _this.setData({
        uesrinfo: data
      })
      console.log(data)
    })
    _this.getcase()
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
  //获取数据
  getcase:function(){
    let _this = this;
    app.getuesrinfo(function(data){
      if(data){
        wx.request({
          url: app.globalData.apiUrl+'/index.php?g=Comments&m=Favorite&a=index',
          // method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': app.globalData.token
          },
          data: {
            page:1,
            num:100
          },
          success: function (res) {
            console.log(res)
            _this.setData({
              otherinfo: res.data.data
            })
          }
        })
      }
    })
  },
  gocasepage: function (e) {
    var _this = this;
    var catid = e.target.dataset.catid
    var id = e.target.dataset.id
    //  console.log(111)
    if (!catid & !id) {
      //  console.log(111)
      return
    }
    wx.navigateTo({
      url: "../casepages/casepages?carid=" + catid + "&id=" + id,
    })
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