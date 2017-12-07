const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
  data: {
    userInfo: null,
    boundType: app.boundType,
    studentFunction: [
        {
            name: '课程表', 
            iconPath:'../../../res/images/person/course.png',
            url: '/pages/common/timetable/timetable'
        },
        {
            name: '考勤记录',
            iconPath: '../../../res/images/person/check.png',
            url: '/pages/student/record/record'
        },
        {
            name: '请假',
            iconPath: '../../../res/images/person/ask.png',
            url: '/pages/student/ask/ask'
        }
    ]
  },

  onLoad(options) {
      const self = this;
      wx.getSetting({
          success: (res) => {
              if (res.authSetting['scope.userInfo']){
                  tool.getUserInfo((userInfo)=>{
                      self.setData({userInfo: userInfo});
                  })
              }else{
                  tool.getUserInfo((userInfo) => {
                      self.setData({ userInfo: userInfo });
                  }) 
              }   
          }
      });
      
  },
  onReady(){
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide(){
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  
  }
})