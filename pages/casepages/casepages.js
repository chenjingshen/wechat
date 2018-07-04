// pages/casepages/casepages.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.casepages,
    picturedata1: util.caselist,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swipernum: 0,
    pldate:[],
    plsm:[],
    isCollection:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    var _this = this
    _this.getnawdata()
    _this.setData({
      carid: options.carid,
      id: options.id
    })
     //获取详细地址
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=info',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        catid: _this.data.carid,
        id: _this.data.id
        // code: res.code
      },
      success: function (res) {
        console.log(res)
        var content = res.data.content
                     .replace(/src="[\s\S]*?\/upload\//g, 'style="max-width:100%;" src="' + app.globalData.apiUrl+'/upload/')
        let isCollection = res.data.is_favorite==1 ? true :false
        let isdianzhan = res.data.is_vote==1 ? true :false
        _this.setData({
          casepage: res.data,
          content: content,
          dianz: res.data.vote_count,
          shangc: res.data.favorite_count,
          isCollection: isCollection,
          isdianzhan: isdianzhan,
          mancatid: res.data.man.catid,
          manid: res.data.man.id
        })
      }
    })
   //获取评论
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Comments&m=Index&a=json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        catid: _this.data.carid,
        id: _this.data.id
        // code: res.code
      },
      success: function (res) {
        var art = res.data.data
        console.log(res)
       
        for (let key in art){
          // art[key].date = new Data(art[key].date * 1000)
          var n = parseInt(art[key].date) * 1000;
          var date = new Date(n);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var H =  (date.getHours() < 10 ? '0' + date.getMonth(): date.getMonth()) +':';
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
          var plt = M + D
          var pls = H + m
          _this.data.pldate.push(plt)
          _this.data.plsm.push(pls)
          if (art[key].child[0]){
            art[key].child[0].date = _this.timestampToTime(art[key].child[0].date)
          }
          
          // console.log( M + D)
          // console.log(pls)
        }
        _this.setData({
          pldate: _this.data.pldate,
          plsm: _this.data.plsm,
          pldata: art
        })
        console.log(res)
      }
    })
    // _this.addcomment()
  },
  // 点赞
  addgood:function(){
    let _this = this;
    app.Collection(
      "/index.php?g=Comments&m=Favorite&a=vote",
      {
        catid: _this.data.carid,
        id: _this.data.id
      },
      function (data) {
        // console.log(data)
        wx.showToast({
          title: data.data.info,
          // icon: 'success',
          duration: 1000
        })
        if (data.data.info=='点赞成功'){
          _this.setData({
            dianz: parseInt(_this.data.dianz)+1,
            isdianzhan:true
          })
        }else{
          _this.setData({
            dianz: parseInt(_this.data.dianz) -1,
            isdianzhan: false
          })
        }
        console.log(data)
      }
    )
  },
  commentid:function(e){
    let _this = this;
    let commentid = e.target.dataset.commentid
    let index = e.target.dataset.index
    app.Collection(
      "/index.php?g=Comments&m=Favorite&a=vote",
      {
        catid: _this.data.carid,
        id: _this.data.id,
        commentid: commentid
      },
      function (data) {
        wx.showToast({
          title: data.data.info,
          // icon: 'success',
          duration: 1000
        })
        if (data.data.info == '点赞成功') {
          let adds = _this.data.pldata
          adds[index].vote_count = parseInt(_this.data.pldata[index].vote_count)+1
          _this.setData({
            pldata: adds,
            // isdianzhan: true
          })
        }else{
          let adds = _this.data.pldata
          adds[index].vote_count = parseInt(_this.data.pldata[index].vote_count) -1
          _this.setData({
            pldata: adds,
            // isdianzhan: true
          })
        }
        console.log(data)
      }
    )
  },
  timestampToTime: function(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+ M + D + h + m + s;
  },
  //添加评论方式
  addcommentfn: function (val){
    var _this = this;
    if (val==''){
      wx.showToast({
        title: '评论不能为空',
      }) 
      return
    }
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Comments&m=Index&a=add',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      data: {
        content: val,
        comment_catid: _this.data.carid,
        comment_id: _this.data.id
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.info,
        }) 
        _this.setData({
          form_info: ''
        })
      }
    })
  },
  formSubmit:function(e){
    var _this = this;
    var val = e.detail.value.pl
    app.getuesrinfo(function (data) {
      if (data) {
        _this.addcommentfn(val)
       
      }
    })
    // console.log(e)
  },
  //添加收藏
  addCollection:function(){
    let _this = this
    app.Collection(
      "/index.php?g=Comments&m=Favorite&a=add",
      {
        catid: _this.data.carid,
        id: _this.data.id
      },
      function(data){
        if (data.data.info =='收藏成功'){
          _this.setData({
            shangc: parseInt(_this.data.shangc) + 1,
            isCollection:true
          })
        }
        if (data.data.info == '删除收藏成功！') {
          _this.setData({
            shangc: parseInt(_this.data.shangc) -1,
            isCollection:false
          })
        }
        // if(da)
        wx.showToast({
          title: data.data.info,
          // icon: 'success',
          duration: 1000
        })
        console.log(data)
      }
    )
  },
  // 收藏操作
  Collection:function(){
    var _this = this;

    app.getuesrinfo(function(data){
      console.log(data)
      if(data){
        _this.addCollection()
      }
    })
  
  },
  //预约设计
  getsj:function(){
    let _this = this;

    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=GuestBook&a=add',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        typeid: 1,
        catid: _this.data.mancatid,
        id: _this.data.manid,
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.info,
          // icon: 'success',
          duration: 1000
        })
      }
    })
  },
  //获取相关产品
  getnawdata:function(){
    let _data = app.caseadds
    this.setData({
      caseadds: _data
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