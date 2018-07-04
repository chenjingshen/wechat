// pages/indexsultation/indexsultation.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.indexsultation,
    page:1,
    pldate:[],
    pldatedesc:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.indexsultation)
    let _this = this;
    _this.getnewlist()
    let catid = options.catid ? options.catid:16
    _this.setData({
      catid: catid
    })
    _this.getteam()
  },
  //获取新闻列表
    getnewlist:function(){
      let _this = this;
      wx.request({
        url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=category',
        data: {
          catid: 4,
        },
        success: function (res) {
          console.log(res.data)
          _this.setData({
            newlist: res.data
          })
        }
      })
    },
    changenaw:function(e){
      let _this = this;
      let catid = e.target.dataset.catid
      _this.setData({
        catid: catid,
        page:1
      })
      _this.getteam()
     console.log(e)
    },
    //获取新闻
    getteam: function (ismore) {
      let _this = this;
      wx.showLoading({
        title: '加载数据中',
        mask: 'true'
      })
      wx.request({
        url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
        data: {
          catid: _this.data.catid,
          num: 6,
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
          let pldate = ismore ? _this.data.pldate : []
          for (let key in res.data) {
            // art[key].date = new Data(art[key].date * 1000)
            var n = parseInt(res.data[key].updatetime) * 1000;
            var date = new Date(n);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var H = (date.getHours() < 10 ? '0' + date.getMonth() : date.getMonth()) + ':';
            var plt = Y + M + D
            pldate.push(plt)
           }
          // console.log(pldate)
          _this.setData({
            pldate: pldate,
          })
          let pldatedesc = ismore ? _this.data.pldatedesc : []
          for (let key in res.data) {
            pldatedesc.push(res.data[key].desc.substring(0,15))
          }
          _this.setData({
            pldatedesc: pldatedesc
          })
          // console.log(pldatedesc)
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
    godefaulf:function(e){
      let _this =this;
      let catid = e.target.dataset.catid
      let id = e.target.dataset.id
      console.log(catid, id)
      wx.navigateTo({
        url: "../activactivdefault/activactivdefault?catid=" + catid + "&id=" + id
      })
      // console.log(app.newdefaulfdata)
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