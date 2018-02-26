const tool = require('../../../res/third/tool.js');
const pagingSys = require("../../common/paging/paging.js"); 
const app = getApp();
Page({
    data: {
        course:"",
        caseList:null,
        currentCaseList: null,        
        paging: {
            page: 0,
            skip: 6,
            pageSum: 1
        },
        checkStatus: ["已签", "缺勤", "假", "签补"]
    },
    onLoad: function (options) {
        const course = options.course;
        const conf = {
            url:"https://check.qianyanxu.com/student/course/singlerecord",
            method:"POST",
            data:{
                openId: app.openId,
                course: course
            }
        }
        tool.fetch(conf, (result)=>{
            const reacord = result.data.record;
            const pagingSet = this.data.paging;
            const currentCaseList = pagingSys.paging(reacord, pagingSet);
            const paging = {
                ...pagingSet,
                pageSum: Math.ceil(reacord.length / pagingSet.skip),
            }
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        course: course,
                        caseList: reacord,
                        currentCaseList: currentCaseList,
                        paging: paging
                    });
                }
            })
        });
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
    handlePaging: function (e) {
        const dir = e.target.id;
        pagingSys.handlePaging.call(this, dir);
    }
})