const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
    data: {
        courseInfo: null,
        date: "",
    },
    onLoad(options) {
        const self = this;
        //通过openId和boundType想服务器请求对应的课程资源 学生与老师公用一个主页
        const openId = app.openId;
        const conf = {
            url: 'https://check.qianyanxu.com/base/course',
            data:{
                "openId": app.openId,
                "type": app.boundType,
                "mark":0
            },
            method:"POST",
        }
        const getTop = new Promise((resolve, reject)=>{
            wx.getSystemInfo({
                success: (res) => {
                    const query = wx.createSelectorQuery();
                    query.select('#container').boundingClientRect((rect)=>{
                        resolve({
                            containerHeight:rect.height,
                            windowHeight: res.windowHeight
                        });
                    }).exec();
                }
            })
        });
        getTop.then((result)=>{
            tool.fetch(conf, (res) => {
                if (res.statusCode) {
                    this.setData({
                        courseInfo: res.data.course,
                        top: (result.windowHeight - result.containerHeight)/2,
                        date:tool.getDate()
                    });
                }
            });
        });
    },
})
