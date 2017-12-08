const studentCheck = require('../../student/check/check.js');
const app = getApp();
Page({
    data: {
        boundType: "",
        studentConf: null
    },
    onLoad: function (options) {    
        if (app.boundType == -1){//1是老师 -1是学生
            studentCheck.getStudentLoaction((conf)=>{
                this.setData({ 
                    studentConf:conf,
                    boundType: app.boundType
                });
            });
        }else{
            this.setData({
                boundType: app.boundType
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