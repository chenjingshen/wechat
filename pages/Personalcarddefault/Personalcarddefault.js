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

  
  onLoad: function (options) {
    
    let relation = options.relation.split(',')
    console.log(relation)
    // console.log(util.personalcenter)
    let _this = this
    app.getuesrinfo(function (data) {
      _this.setData({
        uesrinfo: data,
        modelid: parseInt(relation[0]),
        id: parseInt(relation[1])
      })
      _this.getcardelf()
      // console.log(data)
    })
    
  },
  //获取页面
  getcardelf: function (){
      let _this = this;
      wx.request({
        url: app.globalData.apiUrl+'/index.php?g=Addons&m=Ajax&a=infoByid',
        // method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': app.globalData.token
        },
        data: {
          modelid: _this.data.modelid,
          id: _this.data.id
        },
        success: function (res) {
          console.log(res)
          _this.setData({
            uesrinfopro: res.data,
            starttime: _this.timestampToTime(res.data.starttime),
            endtime: _this.timestampToTime(res.data.endtime),
            catid: res.data.catid,
            id: res.data.id,
            cid: res.data.card? res.data.card.cid : ''
          })
          let data = (new Date()) / 1000
          if ((data - parseInt(res.data.starttime)) < 0) {
            _this.setData({
              weis: '活动还未开始',
              isfou: false
            })
          } else if ((data - parseInt(res.data.endtime)) > 0) {
            _this.setData({
              weis: '活动已经结束',
              isfou: false
            })
          } else {
            if (res.data.card == null) {
              _this.setData({
                weis: '领取卡劵',
                isfou: true,
              })
            } else {
              if (res.data.card.status == 0) {
                _this.setData({
                  weis: '核销',
                  isfou: true
                })
              } else {
                _this.setData({
                  weis: '已经核销',
                  isfou: false
                })
              }
            }
          }
        }
      })
  },
  //s时间处理
  timestampToTime: function (timestamp){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
    return Y + M + D 
  },
     qukaobao:function(){
       let _this = this;
      
       if (_this.data.weis == '领取卡劵'){
         app.lqucard({
           catid: _this.data.catid,
           id: _this.data.id
         }, function (res) {
           wx.showToast({
             title: res.data.info,
             icon: 'loading',
             duration: 1000
           })
           _this.setData({
             weis: '核销',
             isfou: true
           })
         })
       }
       if (!_this.data.card) {
         _this.getcardelf()
       }
       if (_this.data.weis =='核销'){


         wx.showModal({
           title: '警告通知',
           content: '是否确认核销。',
           success: function (res_cas) {
                if (res_cas){
                  app.hxucard({
                    cid: _this.data.cid
                  }, function (res) {
                    wx.showToast({
                      title: res.data.info,
                      icon: 'loading',
                      duration: 1000
                    })
                    _this.setData({
                      weis: '已经核销',
                      isfou: false
                    })
                  })
                }
              }
            })
       }
       
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