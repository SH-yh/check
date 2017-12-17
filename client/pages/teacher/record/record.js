const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        courseRecord:null
    },
    onLoad: function (options) {
        const openId = app.openId;//拿到老师的唯一标识，去服务器请求该老师的课程考勤情况
        const conf = {
            "url":'https://check.qianyanxu.com/teacher/course/record',
            "method":"POST",
            "data":{
                "openId":app.openId
            }
        }
        tool.fetch(conf, (res)=>{
            const courseRecord = res.data.record;
            tool.addColor(courseRecord);
            this.setData({ courseRecord: courseRecord });

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