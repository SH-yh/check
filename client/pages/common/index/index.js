const tool = require("../../../res/third/tool.js");
const app = getApp();
let marker = false;
Page({
    data: {
        courseInfo: null,
        date: "",
    },
    onLoad(options) {
        this.fetchCourse();
        marker = true;
    },
    onShow(){
        !marker && this.fetchCourse();
        marker = false;
    },
    fetchCourse(){
        const self = this;
        //通过openId和boundType想服务器请求对应的课程资源 学生与老师公用一个主页
        const openId = app.openId;
        const conf = {
            url: 'https://check.qianyanxu.com/base/course',
            data: {
                "openId": app.openId,
                "type": app.boundType,
                "mark": 0
            },
            method: "POST",
        }
        tool.fetch(conf, (res) => {
            const courseInfo = res.data.course; 
            if (res.statusCode) {
                app.courseInfo = courseInfo;
                this.setData({
                    courseInfo: courseInfo,
                    date: tool.getDate()
                });
            }
        });
    }
})
