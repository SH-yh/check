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
        /*
        const data = [
            {
                "name":'小明',
                "studentId":'20141475035',
                "checked":14,
                "absence":2,
                'ask':3
            },
            {
                "name": '小樱',
                "studentId": '20141475125',
                "checked": 17,
                "absence": 2,
                'ask': 0
            },
            {
                "name": '鸣人',
                "studentId": '20141475784',
                "checked": 16,
                "absence": 2,
                'ask': 0
            },
            {
                "name": '小红',
                "studentId": '20141475856',
                "checked": 18,
                "absence": 8,
                'ask': 6
            },
            {
                "name": '阿飞',
                "studentId": '20141475741',
                "checked": 19,
                "absence": 2,
                'ask': 1
            },
            {
                "name": '小李',
                "studentId": '20141475145',
                "checked": 14,
                "absence": 2,
                'ask': 0
            },
            {
                "name": '瓦萨',
                "studentId": '20141475785',
                "checked": 16,
                "absence": 2,
                'ask': 3
            },
            {
                "name": '阿萨',
                "studentId": '20141475963',
                "checked": 15,
                "absence": 2,
                'ask': 3
            },
            {
                "name": '阿飞',
                "studentId": '20141475785',
                "checked": 14,
                "absence": 2,
                'ask': 3
            },
            {
                "name": '违法',
                "studentId": '20141475965',
                "checked": 15,
                "absence": 2,
                'ask': 3
            },
            {
                "name": '违法',
                "studentId": '20141475784',
                "checked": 15,
                "absence": 2,
                'ask': 3
            },
            {
                "name": '违法',
                "studentId": '20141475984',
                "checked": 15,
                "absence": 2,
                'ask': 3
            }
        ];
        */
        wx.getSystemInfo({
            success: (res) => {
                tool.fetch(conf, (result)=>{
                    const caseRecord = result.data.caseRecord;
                    if (result.statusCode == 200 && caseRecord){
                        this.setData({
                            scrollHeight: res.windowHeight - 140,
                            recordCase: caseRecord
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
        const recordCase = this.data.recordCase;
        const result = tool.searchSomething({
            key: 'studentId',
            value: this.queryValue
        }, recordCase);
        result ? this.setData({ recordCase: result }) : wx.showToast({
            title: '无此学生',
            duration: 2000
        })
    }
})