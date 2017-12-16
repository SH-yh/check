const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        course:"",
        checkedMessage:null,
        checkStatus: ["已签", "缺勤", "假", "签补"]
    },
    onLoad: function (options) {
        const course = options.course;
        const conf = {
            url:"https://check.qianyanxu.com/student/course/singlerecord",
            method:"POST",
            data:{
                openId: app.openId,
                course: course
            }
        }
        tool.fetch(conf, (result)=>{
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        scrollHeight: res.windowHeight - 120,
                        course: course,
                        checkedMessage: result.data.record
                    });
                }
            })
        });
    },
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