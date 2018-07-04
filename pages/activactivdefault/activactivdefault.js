// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.activ,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swipernum: 0,
    relation:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log(options)
    let catid = options.catid;
    let id = options.id;
    _this.setData({
      catid: catid,
      id: id
    })
    // console.log(util.activ)
    _this.getindexbananr()
    _this.getproduct(catid,id)
  },
  //获取广告图片
  getindexbananr: function () {
    let _this = this;
    app.getbananr({
      catid: 33
    }, function (_d) {
      // console.log(_d)
      _this.setData({
        bananr: _d.data
      })
    })
  },
  getproduct: function (catid, id) {
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=info',
      // method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        catid: catid,
        id: id
      },
      success: function (res) {
        // console.log(res)
        let newdefaulf = res.data
        console.log(res)
        console.log(newdefaulf.relation)
        if (!newdefaulf.relation){
           _this.setData({
             isfos:false
           })
        }else{
          let relation = newdefaulf.relation.split(',')
          _this.setData({
            relation: relation,
            isfos:true
          })
        }
        
        // console.log(relation)
        let content = newdefaulf.content.replace(/src="[\s\S]*?\/upload\//g, 'style="max-width:100%; height:auto" src="' + app.globalData.apiUrl+'/upload/')
        var n = parseInt(newdefaulf.updatetime) * 1000;
        var date = new Date(n);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var H = (date.getHours() < 10 ? '0' + date.getMonth() : date.getMonth()) + ':';
        var plt = Y + M + D
        _this.setData({
          pldate: plt,
          newdefaulf: newdefaulf,
          content: content,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },
  //  领取卡
  gocard:function(e){
    let _this = this;
    wx.navigateTo({
      url: '../Personalcarddefault/Personalcarddefault?relation=' + _this.data.relation
    })
    console.log(_this.data.relation)
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