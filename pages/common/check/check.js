const studentCheck = require('../../student/check/check.js');
const app = getApp();
Page({
  data: {
    boundType: app.boundType,
    studentConf: null
  },
  onLoad: function (options) {    
      if (this.data.boundType == -1){
          studentCheck.getStudentLoaction((conf)=>{
              this.setData({ studentConf:conf});
          });
      }
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
  handleCheck(){
     wx.showToast({
         title: '点击控件',
         duration:2000
     })
  }
})