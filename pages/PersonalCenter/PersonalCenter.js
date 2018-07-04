// pages/PersonalCenter/PersonalCenter.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.personalcenter,
    house:true,
    make: true,
    route:"pages/PersonalCenter/PersonalCenter"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // _this.getnaw()
    app.getuesrinfo(function (data) {
      _this.setData({
        uesrinfo: data
      })
      console.log(data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      // uesrinfo: ""
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.getuesrinfo())
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
  gocase:function(){
    let _this = this;
    app.getuesrinfo(function(data){
        if(data){
          wx.navigateTo({
            url: '../Personalcase/Personalcase',
          })
        }else{
          wx.showToast({
            title: '请设置用户权限',
            icon: 'loading',
            duration: 1000
          })
        }
     })
  },
  gosjs:function(e){
    let _this = this;
    let catid = e.target.dataset.catid
    app.getuesrinfo(function(data){
      if(data){
        wx.navigateTo({
          url: `../Personalprolist/Personalprolist?catid=${catid}`,
        })
      }else{
        wx.showToast({
          title: '请设置用户权限',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  goCustomer:function(){
   let _this = this;
   wx.navigateTo({
     url: '../Personalcard/Personalcard',
   })
  },
  goPersonal: function () {
    let _this = this;
    wx.navigateTo({
      url: '../Personalcustomer/Personalcustomer',
    })
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
  
  },
  changehouse:function(){
     var _this = this;
     _this.setData({
       house: !_this.data.house
     })
  },
  changemake:function(){
    var _this = this;
    _this.setData({
      make: !_this.data.make
    })
  }
})