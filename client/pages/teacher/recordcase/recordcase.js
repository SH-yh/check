const tool = require('../../../res/third/tool.js');
Page({
    data: {
        recordCase:null,
        scrollHeight: 400
    },
    onLoad: function (options) {
        const { course, courseId, lessonId } = options;
        //通过课程号和课序号来确定一门课，去服务器请求该课程的考勤记录
        const courseNumber = options.courseNumber;
        const lessonNumber = options.lessonNumber;
        const conf = {
            "url": "https://check.qianyanxu.com/teacher/course/recordcase",
            "method":"POST",
            "data":{
                "course": course,
                "courseId": courseId,
                "lessonId": lessonId
            }  
        }
        wx.getSystemInfo({
            success: (res) => {
                tool.fetch(conf, (result)=>{
                    const caseRecord = result.data.caseRecord;
                    if (result.statusCode == 200 && caseRecord){
                        this.setData({
                            scrollHeight: res.windowHeight - 140,
                            recordCase: caseRecord,
                            recordCaseCopy: [...caseRecord]
                        });
                    }
                })
            }
        })        
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
        const recordCaseCopy = this.data.recordCaseCopy;
        const result = tool.searchSomething({
            key: 'account',
            value: this.queryValue
        }, recordCaseCopy);
        result ? this.setData({ recordCase: result }) : wx.showToast({
            title: '无此学生',
            duration: 2000
        })
    }
})