const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
  data: {
    userInfo: null,
    boundType: "",
    tip:3,
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
        },
    ],
    teacherFunction: [
        {
            name: '课程表',
            id:0,
            iconPath: '../../../res/images/person/course.png',
            url: '/pages/common/timetable/timetable',
        },
        {
            name: '考勤记录',
            id: 1,
            iconPath: '../../../res/images/person/check.png',
            url: '/pages/teacher/record/record',
        },
        {
            name: '假条处理',
            id: 2,
            iconPath: '../../../res/images/person/handle.png',
            url: '/pages/teacher/handleask/handleask',
            tip:3
        }
    ]
  },

    onLoad(options) {
        const self = this;
        this.setData({
            userInfo: app.userInfo,
            boundType: app.boundType
        });
        if (wx.getStorageSync('userInfo')) {//如果本地已经保存了用户的信息
            wx.getSetting({
                success: (res) => {
                    tool.getUserInfo((userInfo) => {
                        const nickName = userInfo.nickName;
                        const localNickName = wx.getStorageSync('userInfo').nickName;
                        if (nickName != localNickName){
                            wx.setStorageSync('userInfo', userInfo);
                            self.setData({
                                userInfo: userInfo
                            });
                        }
                    })
                }
            });
        }
    },
    onReady(){
    
    },

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