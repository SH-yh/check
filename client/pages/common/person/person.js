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
        tool.getUserInfo((userInfo) => {
            const nickName = userInfo.nickName;
            const localNickName = wx.getStorageSync('userInfo').nickName;
            self.setData({
                userInfo: userInfo
            });  
        })
    },
    onReady(){
    
    },

    onShow() {
    
    },
    onHide(){
    
    },
    onUnload() {
    
    },
    onPullDownRefresh() {
    
    },
    onReachBottom() {
    
    },
    onShareAppMessage() {
    
    }
})