//index.js
//获取应用实例
const app = getApp()
import navbar from '../../commpents/navbar/navbar'
Page({
 handleHideToast(e){
  wx.hideLoading({
    success: (res) => {
      console.log(res)
    },
  })
 },
 handleTriggerDis(){
  //  debugger
   this.setData({
     buttonDisabled:!this.data.buttonDisabled
   })
  //  this.buttonDisabled=!this.buttonDisabled
 },
  handleButtonClick(){
    wx.showToast({
      title: '提示',
      icon:'success',
      duration:2000
    })
    wx.showLoading({
      title: '下载',
    })
    setTimeout(this.handleHideToast,2000)
  },
  handleCheck(e){
    console.log(e)
    debugger
    console.log(this.data.checkValue)
    },
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.fillRect(10, 10, 20, 100)
      })
  },
  data: {
    motto: 'Hello World JK',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navbar,
    myName:app.globalData.myName,
    buttonDisabled:false,
    checkValue:''
  },
  //事件处理函数
  bindViewTap: function() {
    
    wx.navigateTo({
      url: '../../commpents/navbar/navbar'
    })
  },
  onShow:function(){
    console.log('1')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
