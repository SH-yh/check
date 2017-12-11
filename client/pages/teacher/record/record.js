const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        courseRecord:null
    },
    onLoad: function (options) {
        const openId = app.openId;//拿到老师的唯一标识，去服务器请求该老师的课程考勤情况
        const conf = {
            url:'https://www.check.qianyanxu.com/check/teacher/course/check'
        }
        const courseRecord = [
            {
                "course":'数据结构',
                "lessonNumber":'02',
                "grade":"2014级",
                "major":"计算机科学与技术",
                "courseNumber": '1520',
                "class":"5班",
                "checkNum":"14"
            },
            {
                "course": '离散',
                "grade": "2014级",
                "major": "网络安全",
                "class": "5班",
                "courseNumber":'1520',
                "lessonNumber": '02',
                "checkNum": "14"
            }
        ];
        tool.addColor(courseRecord);
        this.setData({ courseRecord:courseRecord});
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

    }
})