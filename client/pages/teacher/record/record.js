const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        courseRecord:null,
        courseRecordCopy: null
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
            const courseRecordCopy = [...courseRecord];
            this.setData({ 
                courseRecord: courseRecord, 
                scrollHeight:app.windowHeight*3/4,
                courseRecordCopy: courseRecordCopy
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

    },
    handleQuery(e) {
        this.queryValue = e.detail.value;
    },
    handleSeacher() {
        const courseRecordCopy = this.data.courseRecordCopy;
        const result = tool.searchSomething({
            key: 'course',
            value: this.queryValue
        }, courseRecordCopy);
        result ? this.setData({ courseRecord: result }) : wx.showToast({
            title: '无该课程',
            duration: 2000
        })
    }
})