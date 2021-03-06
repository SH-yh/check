const studentCheck = require('../../student/check/check.js');
const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
    data: {
        checkWay:"",
        random:"",
        sum:"0",
        checkedSum:"0"
    },
    onLoad: function (options) {
        const courseInfo = app.courseInfo;
        let random = null;
        if (!tool.getTeacherStatus(courseInfo)){//false表示无法发起签到，true可以发起签到
            tool.showToast("您当前没有课程");
            setTimeout(()=>(wx.switchTab({url: '/pages/common/index/index'})), 1000)
            return;
        }
        const { courseId, lessonId, index, week, time, course, teacher } = courseInfo[0];
        console.log(app)
        const message = {
            "check": true,
            "type": app.boundType,
            "time": time,
            "openId": app.openId,
            "courseId": courseId,
            "lessonId": lessonId,
            "course": course,
            "index":index
        }
        //老师当前时间有课可以发起考勤
        const checkWay = options.way;//获取老师考勤方式
        const url = `wss://check.qianyanxu.com/check/${week}/${courseId}/${lessonId}`;
        //预备考勤记录需要的信息
        if (checkWay == "random") {
            random = Math.floor(Math.random() * 8999 + 1000).toString().split("");
            //组装websocket传递信息
            message.checkWay = {
                "way": checkWay,
                "random": random
            }
            //进行websocket通信
            tool.webSocket(url, message);
            this.setData({
                checkWay: checkWay,
                random: random
            })
        } else if (checkWay == "gps") {
            studentCheck.getStudentLoaction((conf) => {
                message.checkWay = {
                    "way": checkWay,
                    "location": {
                        "longitude": conf.longitude,
                        "latitude": conf.latitude
                    }
                }
                tool.webSocket(url, message);
                this.setData({
                    mapConf: conf,
                    checkWay: checkWay,
                });
            });
        }
    },
    onReady: function () {
        const self = this;
        wx.onSocketMessage((res) => {
            const data = JSON.parse(res.data);
            console.log(data);
            if ('sum' in data) {
                self.setData({
                    sum: data.sum
                })
            } else if ('checkSum' in data) {
                self.setData({
                    checkedSum: data.checkSum
                })
            }
        });

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
    handleEndCheck: function(){
        //结束websocket
        wx.closeSocket({
            "complete": ()=>{//调用接口成功后，路由转向首页
                tool.showToast("签到结束！", 1000);
                setTimeout(()=>{
                    wx.switchTab({
                        url: '/pages/common/index/index',
                    })
                }, 1000)
            }
        })
       
    }
})