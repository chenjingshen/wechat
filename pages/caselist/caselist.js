// pages/caselist/caselist.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.caselist,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swipernum: 0,
    num: 0,
    nawtj: {},
    nawindex: [],
    caselist: [],
    page: 1,
    route: "pages/caselist/caselist"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (JSON.stringify(options) != "{}") {
      console.log(options)
      var obj = {};
      obj.name = options.name
      obj.parent = options.parent
      obj.key = options.key
      var nawindex = _this.data.nawindex;
      nawindex.push(obj)
      let data = {}
      nawindex.forEach(item => {
        data[item.parent] = item.key
      })
      _this.setData({
        nawindex: nawindex,
        nawtj: data,
        page: 1
      })
    }
    // console.log(options)


    _this.getcaselist()
    _this.getcaselistnaw()

  },
  //第一次获取产品
  getcaselist: function (ismore) {
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "/index.php?g=Addons&m=Ajax&a=lists", //仅为示例，并非真实的接口地址
      data: Object.assign({
        catid: 2,
        num: 8,
        page: _this.data.page,
        // hy:'互联网'
      }, _this.data.nawtj),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有更多产品',
            icon: 'loading',
            duration: 1000
          })
        }
        console.log(res)
        var caselist = ismore ? _this.data.caselist : []
        for (let key in res.data) {
          caselist.push(res.data[key])
        }
        app.caseadds = caselist
        _this.setData({
          caselist: caselist
        })
        console.log(_this.data.nawtj)
      }
    })
  },
  //获取导航
  getcaselistnaw: function () {
    var _this = this;
    wx.showLoading({
      title: '加载数据中...',
      mask: 'true'
    })
    wx.request({
      url: "https://xcx.stzhs.com/index.php?g=Addons&m=Ajax&a=search_field", //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var fornum = [];
        var suancae = [];
        for (var key in res.data[0].child) {
          fornum.push(res.data[0].child[key])
          suancae.push(key)
        }
        _this.setData({
          listnaw: res.data,
          fornum: fornum,
          suancae: suancae
        })
        wx.hideLoading()
        // console.log(res)
      }
    })
  },
  //添加筛选条件
  listvicsnaw: function (e) {

    var _this = this;
    var obj = {}
    var tit = e.target.dataset.tit
    var index = e.target.dataset.index
    var num = _this.data.num
    var nawindex = _this.data.nawindex;
    if (num == 0) {
      obj.name = tit
      obj.parent = "hy"
      obj.key = _this.data.suancae[index]
    }
    if (num == 1) {
      obj.name = tit
      obj.parent = "mj"
      obj.key = _this.data.suancae[index]
    }
    if (num == 2) {
      obj.name = tit
      obj.parent = "fg"
      obj.key = _this.data.suancae[index]
    }
    if (num == 3) {
      obj.name = tit
      obj.parent = "qy"
      obj.key = _this.data.suancae[index]
    }

    if (num == 5) {
      obj.name = tit
      obj.parent = "fy"
      obj.key = _this.data.suancae[index]
    }
    nawindex.forEach((item, key) => {
      if (item.parent == obj.parent) {
        nawindex.splice(key, 1)
      }
    })
    nawindex.push(obj)
    let data = {}
    nawindex.forEach(item => {
      data[item.parent] = item.key
    })
    _this.setData({
      nawindex: nawindex,
      nawtj: data,
      page: 1
    })
    _this.getcaselist()
  },
  //删除
  delenaw: function (e) {
    var _this = this;
    var index = e.target.dataset.index
    var nawindex = _this.data.nawindex;
    nawindex.splice(index, 1)
    let data = {}
    nawindex.forEach(item => {
      data[item.parent] = item.key
    })
    _this.setData({
      nawindex: nawindex,
      nawtj: data,
      page: 1
    })
    _this.getcaselist()
  },
  // 筛选数据导航
  changenaw: function (e) {

    var _this = this
    var num = e.target.dataset.index
    console.log(num)
    var fornum = [];
    var suancae = [];
    for (var key in _this.data.listnaw[num].child) {
      fornum.push(_this.data.listnaw[num].child[key])
      suancae.push(key)
    }
    _this.setData({
      fornum: fornum,
      num: num,
      suancae: suancae

    })
    // console.log(suancae)
  },
  // 加载更多
  more: function () {
    var _this = this;
    var page = _this.data.page + 1
    _this.setData({
      page: page
    })
    _this.getcaselist(true)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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