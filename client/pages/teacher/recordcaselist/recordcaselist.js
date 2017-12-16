// pages/teacher/recordcaselist/recordcaselist.js
Page({
  data: {
    caseList:null
  },
  onLoad: function (options) {
      const caseList = [
          {
              'date':'2017年10月2日',
              'id':'0',//用来表示第几次考勤
              'courseId':'123',//课程号
              'lessonId': '02',//课序号
              'time':'10：15',
              'course':'数据结构'
          },
          {
              'date': '2017年10月2日',
              'id': '0',//用来表示第几次考勤
              'courseId': '123',//课程号
              'lessonId': '02',//课序号
              'time': '10：15',
              'course': '数据结构'
          },
          {
              'date': '2017年10月2日',
              'id': '0',//用来表示第几次考勤
              'courseId': '123',//课程号
              'lessonId': '02',//课序号
              'time': '10：15',
              'course': '数据结构'
          }
      ]
      this.setData({ caseList:caseList});
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