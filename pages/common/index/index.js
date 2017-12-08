const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
  data: {
    courseInfo: {},
    boundMark: "",
    date: tool.getDate(),
  },
  onLoad(options) {
    //通过openId和boundType想服务器请求对应的课程资源 学生与老师公用一个主页
    //openId = App.openId 
    const boundMark = options.boundMark || app.boundMark; 
    tool.fetchCourse((data)=>{
        this.setData({
            courseInfo: data,
            boundMark: app.boundMark
        });
    });
  }
})
