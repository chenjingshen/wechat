//app.js
App({
  globalData: {
    userInfo: null,
    apiUrl: 'https://xcx.stzhs.com',
    currentProductDetail: null,
    token: '',
    uesinfo:1
  },
  newdefaulfdata:[],
  actprodefaulfdata:[],
  suanx:[],
  caseadds:[],
 onLaunch:function(){
     //微信授权登录 获取token 并且保存到全局变量里面
    let  _this = this
    let token = wx.getStorageSync('token')
    if (!token){
      wx.login({
        success:function(res){
          if (res.code) {
            wx.request({
              url: _this.globalData.apiUrl+'/index.php?m=Weixin&a=index',
              data: {
                code: res.code
              },
              success:function(res){
                wx.setStorageSync('token', res.data)
                _this.globalData.token = res.data.data
                console.log(_this.globalData.token)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
       })
     }else{
      _this.globalData.token = token.data
      // console.log(_this.globalData.token)
     }
 },
 //获取用户信息
 getuesrinfo: function (callback) {
   var _this = this
   var uesinfo = wx.getStorageSync('uesinfo')
   // console.log(app.globalData.token)
   if (!uesinfo) {
     wx.request({
       url: _this.globalData.apiUrl+'/index.php?m=Weixin&a=userinfo',
       header: {
         'content-type': 'application/x-www-form-urlencoded',
         'token': _this.globalData.token
       },
       data: {
        //  code: _this.globalData.token
       },
       success: function (res) {
         // _this.globalData.token = res.data
         console.log(res)
         if (res.data.nickName == '') {
           //获取用户信息
           wx.getUserInfo({
             withCredentials: true,
             success: function (res_user) {
               wx.setStorageSync('uesinfo', res_user.userInfo)
               _this.globalData.uesinfo = res_user.userInfo
              //  console.log(wx.getStorageSync('uesinfo'))
               _this.preserveuesrinfo(res_user.userInfo)
               callback(res_user.userInfo)
               return true
             },
             fail: function () {
               wx.showModal({
                 title: '警告通知',
                 content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                 success: function (res_cas) {
                   if (res_cas.confirm) {
                     wx.openSetting({
                       success: function (res_cas) {
                         console.log(res_cas)
                         if (res_cas.authSetting["scope.userInfo"]) {//如果用户重新同意了授权登录
                           wx.getUserInfo({
                             withCredentials: true,
                             success: function (res_usert) {
                               wx.setStorageSync('uesinfo', res_usert.userInfo)
                               _this.globalData.uesinfo = res_usert.userInfo
                               _this.preserveuesrinfo(res_usert.userInfo)
                              //  console.log(res_usert.userInfo)
                               callback(res_usert.userInfo)
                               return true
                             }
                           })
                         }
                       }
                     })
                   }
                 }
               })
             }
           })
         } else {
           _this.globalData.uesinfo = res.data
           callback(res.data)
           console.log(res)
           return true
         }
       }
     })
   } else {
     _this.globalData.uesinfo = wx.getStorageSync('uesinfo')
     callback(wx.getStorageSync('uesinfo'))
     return true
   }
 },
 //保存用户信息  
 preserveuesrinfo: function (res){
      // var userInfo = res.userInfo
      var _this = this
      var nickName = res.nickName
      var avatarUrl = res.avatarUrl
      var gender = res.gender == 0 ? "未知" : res.gender == 1 ? "男" : "女"//性别 0：未知、1：男、2：女
      var province = res.province
      var city = res.city
      var country = res.country
     wx.request({
       url: _this.globalData.apiUrl+'/index.php?m=Weixin&a=saveinfo',
       method:'post',
       header: {
         'content-type': 'application/x-www-form-urlencoded', 
         'token': _this.globalData.token
       },
       data:{
         nickName: nickName,
         avatarUrl: avatarUrl,
         gender: gender,
         province: province,
         city: city,
         country: country
       },
       success:function(res){
          // console.log(res)
       }
     })
 },
  //  收藏列表
 Collection: function (url,data, callback){
   var _this =this
   wx.request({
     url: _this.globalData.apiUrl+url,
    //  method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'token': _this.globalData.token
     },
     data:data?data:{},
     success: function (res) {
       callback(res)
     }
   })
 },
 getbananr: function (data, callback){
    let _this = this;
    wx.request({
      url: _this.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=ad',
    //  method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'token': _this.globalData.token
     },
     data:data?data:{},
     success: function (res) {
       callback(res)
     }
   })
  },
  //获取卡券列表
 getcard: function (data, callback){
    let _this = this;
    wx.request({
      url: _this.globalData.apiUrl+'/index.php?g=Comments&m=Card&a=index',
      // method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _this.globalData.token
      },
      data: data ? data : {},
      success: function (res) {
        callback(res)
      }
    })
  },
  //领取卡券
 lqucard: function (data, callback) {
   let _this = this;
   wx.request({
     url: _this.globalData.apiUrl+'/index.php?g=Comments&m=Card&a=add',
    //  method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'token': _this.globalData.token
     },
     data: data ? data : {},
     success: function (res) {
       callback(res)
     }
    })
  },
//  核销卡券
 hxucard: function (data, callback) {
   let _this = this;
   wx.request({
     url: _this.globalData.apiUrl+'/index.php?g=Comments&m=Card&a=carddel',
    //  method: 'post',
     header: {
       'content-type': 'application/x-www-form-urlencoded',
       'token': _this.globalData.token
     },
     data: data ? data : {},
     success: function (res) {
       callback(res)
     }
   })
 },
   
})