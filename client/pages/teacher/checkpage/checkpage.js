const studentCheck = require('../../student/check/check.js');
const app = getApp();
Page({
  data: {
    checkWay:"",
    random:"",
    sum:"41",
    checkedNum:"4"
  },
  onLoad: function (options) {
    let random = null; 
    const checkWay = options.way;
    if (checkWay == "random"){
        random = Math.floor(Math.random() * 8999 + 1000).toString().split("");
        this.setData({
            checkWay: checkWay,
            random: random
        })
    } else if (checkWay == "gps"){
        studentCheck.getStudentLoaction((conf) => {
            this.setData({ 
                mapConf: conf,
                checkWay: checkWay, 
            });
        });
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