const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
  data: {
    accountValue:"",
    passwordValue:""
  },

  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  handleAccontInput(e){
    this.setData({
        accountValue:e.detail.value
    });
  },
  handlePasswordInput(e){
    this.setData({
        passwordValue: e.detail.value
    });
  },
  handleConfirm(){
    const accountValue = this.data.accountValue;
    const passwordValue = this.data.passwordValue;
    const length = this.data.accountValue.length;
    if (accountValue == "" || passwordValue==""){
        wx.showToast({
            title: '请填写完整！',
            duration:2000
        })
    }else{
        if(length == 5 || length == 11){
            tool.boundIdentity("", (res)=>{
                if(res.ok){
                    app.boundMark = res.boundMark;
                    //app.boundType = res.boundType;
                    if (length == 5){
                        app.boundType = 1;
                    } else if (length == 11){
                        app.boundType = -1;
                    }
                    wx.switchTab({
                        url: '/pages/common/index/index',
                    })
                }else{
                    wx.showToast({
                        title: '账号密码错误',
                        duration: 2000
                    })
                }
            })
        }else{
            wx.showToast({
                title: '账号错误！',
                duration: 2000
            })
        }
    }
  }
})