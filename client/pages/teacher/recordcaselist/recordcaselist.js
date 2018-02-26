const tool = require("../../../res/third/tool.js");
const pagingSys =  require("../../common/paging/paging.js");
const app = getApp();
Page({
    data: {
        caseList:null,
        currentCaseList: null,
        paging: {
            page:0,
            skip: 5,
            pageSum: 1
        },
        courseId: null,
        lessonId: null,
        course: null,
    },
    onLoad: function (options) {
        const checkNum = options.checkNum;
        if (checkNum == 0){
            tool.showToast("无签到记录");
            setTimeout(()=>{
                wx.navigateBack({
                    delta: 1
                })
            }, 2000)
        }else{
            const course = options.course;
            const courseId = options.courseId;
            const lessonId = options.lessonId;
            const conf = {
                "url": "https://check.qianyanxu.com/teacher/course/record/history",
                "method": "POST",
                "data": {
                    "openId": app.openId,
                    "courseId": courseId,
                    "lessonId": lessonId,
                }
            }
            tool.fetch(conf, (res) => {
                const recordHistory = res.data.record;
                const caseList = recordHistory.checkList;
                const pagingSet = this.data.paging;
                const currentCaseList = pagingSys.paging(caseList, pagingSet);//获得当前分页数据
                const paging = {
                    ...pagingSet,
                    pageSum: Math.ceil(caseList.length / pagingSet.skip),
                }
                this.setData({
                    caseList: caseList,
                    currentCaseList: currentCaseList,
                    courseId: recordHistory.courseId,
                    lessonId: recordHistory.lessonId,
                    paging: paging,
                    course: course,
                });
            });
        }
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
    handlePaging: function(e){
        const dir = e.target.id;
        pagingSys.handlePaging.call(this, dir);
    }
})