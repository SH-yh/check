const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
  data: {
    courseInfo: {},
    boundMark: false,
    date: tool.getDate(),
  },
  onLoad(options) {
    //通过openId想服务器请求对应的课程资源
    //openId = App.openId
    const boundMark = options.boundMark || app.boundMark; 
    tool.fetchCourse((data)=>{
        this.setData({
            courseInfo: data,
            boundMark: data.boundMark
        });
    });
  }
})
