const tool = require("../../res/third/tool.js");
const app = getApp();
Page({
  data: {
    courseInfo: {},
    boundMark: false,
    date: tool.getDate(),
  },
  onLoad() {
    console.log(app.boundMark);
    tool.fetchCourse((data)=>{
        this.setData({
            courseInfo: data,
            boundMark: data.boundMark
        });
    });
  }
})
