const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
    data: {
        caseList:null
    },
    onLoad: function (options) {
        const course = options.course;
        const courseId = options.courseId;
        const lessonId = options.lessonId;
        const conf = {
            "url":"https://check.qianyanxu.com/teacher/course/record/history",
            "method":"POST",
            "data":{
                "openId":app.openId,
                "courseId": courseId,
                "lessonId": lessonId ,
            }
        }
        tool.fetch(conf, (res)=>{
            const recordHistory = res.data.record;
            this.setData({
                caseList: recordHistory.checkList,
                courseId: recordHistory.courseId,
                lessonId: recordHistory.lessonId,
                course : course   
            });
        });
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