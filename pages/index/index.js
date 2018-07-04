
const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    showOrHidden:false,
    imgUrl: util.imgurl,
    pldate: [],
    route: "pages/index/index"
  },
  
  onLoad: function () {
    this.getindexbananr()
    this.getactivact()
    this.getcaseview()
    // console.log(util.imgurl)
  },
  switchTab:function(){
    this.setData({
      showOrHidden: !this.data.showOrHidden
    })
  },
  //跳转到品牌介绍页面
  goindexabout:function(){
    let _this = this;
    wx.navigateTo({
      url: "../indexabout/indexabout"
    })
  },
  //跳转到经典案例
  goindexcase:function(){
    let _this = this
    wx.navigateTo({
      url: "../indexcase/indexcase"
    })
  },
  //跳转到设计团队
  goindexteam:function(){
    let _this = this
    wx.navigateTo({
      url: "../indexteam/indexteam"
    })
  },
  //拨打电话
  calltelephone:function(){
    let _this = this;
    wx.makePhoneCall({
      phoneNumber: '400-088-0848' 
    })
  },
  //跳转到咨询攻
  gosultation: function () {
    let _this = this;
    wx.navigateTo({
      url: "../indexsultation/indexsultation"
    })
  },
  //获取广告图
  getindexbananr:function(){
    let _this = this;
    app.getbananr({
      catid:30
    },function(_d){
      // console.log(_d)
       _this.setData({
         bananr: _d.data
       })
    })
  },
  //获取优惠活动
  getactivact:function(){
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=lists',
      data: {
        catid: 54,
        num:2,
        page:1
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
          var plt = Y+M + D
          var pls = H + m
          _this.data.pldate.push(plt)
        }
        _this.setData({
          pldate: _this.data.pldate,
          activact: res.data
        })
        // console.log(res.data)
      }
    })
  },
  //获取案例
  getcaseview:function(){
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=index_search',
      data: {
        
      },
      success: function (res) {
        let indexfg = res.data['5'].child
        let _indexfg = _this.getflei(indexfg)
        // console.log(adss)

        let indexhy = res.data['9'].child
        app.suanx = indexhy;
        let _indexhy = _this.getflei(indexhy)
        _this.setData({
          indexfg: _indexfg,
          indexhy: _indexhy
        })
        console.log(_this.data.indexfg)
        console.log(_indexhy)
        // console.log(res.data)
      }
    })
  },
  // 数据分类
  getflei: function (indexfg){
    let _this  =this
    let arr = []
    let adss = []
    indexfg.forEach((item, key) => {
      arr.push(item)
      if ((key + 1) % 2 == 0) {
        adss.push(arr)
        arr = []
      } else if ((key + 1) % 2 != 0 & key == (indexfg.length - 1)) {
        adss.push(arr)
        arr = []
      }
    })
    return adss
  },
  // 跳转案例
  goindexhy:function(e){
     let _this = this;
    //  let e.target.dataset.catid
     let name = e.target.dataset.name
     let key = e.target.dataset.key
     let parent = 'hy'
    wx.navigateTo({
      url: `../caselist/caselist?name=${name}&key=${key}&parent=${parent}` 
    })
  },
    // 跳转案例
  goindexfg: function (e) {
    let _this = this;
    //  let e.target.dataset.catid
    let name = e.target.dataset.name
    let key = e.target.dataset.key
    let parent = 'fg'
    wx.navigateTo({
      url: `../caselist/caselist?name=${name}&key=${key}&parent=${parent}`
    })
  },
  goindexnaw:function(e){
    let _this = this;
    let catid = e.target.dataset.catid
    // console.log(catid)
    wx.navigateTo({
      url: `../indexfwlc/indexfwlc?catid=${catid}`
    })
  },
  godeflpro: function (e) {
    let _this = this;
    let catid = e.target.dataset.catid
    let id = e.target.dataset.id
    console.log(catid, id)
    wx.navigateTo({
      url: "../activactivdefault/activactivdefault?catid=" + catid + "&id=" + id
    })
  },
})
