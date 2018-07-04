// pages/indexabout/indexabout.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.indexabout,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.indexabout )
    this.getteam()
  },

  //获取荣誉证书
  getteam: function (ismore) {
    let _this = this;
    wx.showLoading({
      title: '加载数据中',
      mask: 'true'
    })
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
      data: {
        catid: 57,
        num: 4,
        page: _this.data.page
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        let newdata = ismore ? _this.data.newdata : []
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
        }
        _this.setData({
          newdata: newdata
        })
      }
    })
  },
  tremmore: function () {
    let _this = this;
    _this.setData({
      page: _this.data.page + 1
    })
    _this.getteam(true)
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