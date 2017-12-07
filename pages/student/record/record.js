const tool = require('../../../res/third/tool.js');
Page({
  data: {
    "checkReaord":null,
    "page":0
  },

  onLoad: function (options) {
      const conf = {
          url: 'https://www.check.qianyanxu.com/record/courses',
          dataType: 'json',
          method: 'POST'  
      }
      tool.fetchCheckRecord(conf,(data)=>{
          tool.addColor(data);
          this.setData({checkReaord : data});
      });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})