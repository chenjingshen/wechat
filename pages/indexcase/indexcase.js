// pages/indexcase/indexcase.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picturedata: util.indexcase
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util.indexcase)
    this.setData({
      suanx: app.suanx
    })
  },
  goindexhy: function (e) {
    let _this = this;
    //  let e.target.dataset.catid
    let name = e.target.dataset.name
    let key = e.target.dataset.key
    let parent = 'hy'
    wx.navigateTo({
      url: `../caselist/caselist?name=${name}&key=${key}&parent=${parent}`
    })
  },
  formSubmit:function(e){
    let _this = this;
    
     let subject = '免费报价'
     let introduce = e.detail.value.introduce.trim();
    let shouji = e.detail.value.phone
    let email = e.detail.value.subject.trim();
    console.log(shouji)
    if (email==''){
      wx.showToast({
        title: '地址不能为空',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    if (introduce == '') {
      wx.showToast({
        title: '面积不能为空',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(shouji)) {
        wx.showToast({
          title: '手机格式错误',
          icon: 'loading',
          duration: 1000
        })
      return
    }
    wx.request({
      url: app.globalData.apiUrl+'/index.php?g=Addons&m=GuestBook&a=add',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        typeid:1,
        catid:1,
        id:0,
        subject: subject,
        introduce: introduce,
        shouji: shouji,
        email: email
      },
      success: function (res) {
        wx.showToast({
          title: res.data.info,
          // icon: 'success',
          duration: 1000
        })
        _this.setData({
          subject:'',
          introduce:'',
          phone:''
        })
        console.log(res)
      }
    })
    // console.log(e.detail.value.phone)
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