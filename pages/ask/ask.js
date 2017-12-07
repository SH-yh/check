// pages/ask/ask.js
Page({
  data: {
    btnState:'上传假条',
    askSrc:'../../res/images/ask/ask.png',
    mark:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },
  onReady() {
  
  },
  onShow() {
  
  },
  onHide() {
  
  },
  onUnload() {
  
  },
  onPullDownRefresh() {
  
  },
  onReachBottom() {
  
  },
  onShareAppMessage() {
  
  },
  handleAskBtn(){
      const self = this;
      if(self.mark){
          wx.chooseImage({
              count: 1,
              sizeType: ['original'],
              sourceType: ['album', 'camera'],
              success: function (res) {
                  var tempFilePaths = res.tempFilePaths;
                  self.setData({
                      btnState: '确认上传',
                      askSrc: tempFilePaths,
                      mark:false
                  });
              }
          })
      }else{
          //将图片上传到服务器
      }
  }
})