const studentCheck = require('../../student/check/check.js');
const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        boundType: "",
        studentConf: null,
        random: ['', '', '', ''],
        teacherSeting: {
            animationMark: false,
        }
    },
    onLoad: function (options) {
        if (app.boundType == 1){//处理老师的页面转换
            this.setData({
                boundType: app.boundType
            });
        }
    },
    onReady: function () {
    },
    onShow: function () {
        const data = this.data;
        if (app.boundType == 1){
            data.animationMark && this.setData(
                {
                    animationMark: false
                }
            )
        }
        const self = this;
        if (app.boundType == -1) {//1是老师 -1是学生
            const query = studentCheck.queryCheck();
            query.then((res) => {
                console.log(res);
                let message = "";
                switch (res.check) {
                    case 0:
                        message = "没有课程可签到";
                        break;
                    case -1:
                        message = "您已经签过到了";
                        break;
                    case 1:
                        //可以进行签到，转向学生的签到页面
                        studentCheck.handleCheckWay(self, res.check, res.checkWay);
                        return;
                        break;
                    default:
                        break;
                }
                tool.showToast(message, 1500);
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/common/index/index',
                    })
                }, 1500)
            });
        }
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
    handleCheck: studentCheck.handleCheck,
    handleDelKeyItem: studentCheck.handleDelKeyItem,
    handleKeyItem: studentCheck.handleKeyItem,
    handleCheckRandom: studentCheck.handleCheckRandom,
    handleSelectCheckWay(){
        const animationMark = this.data.animationMark;
        this.setData(
            {
                animationMark: !animationMark
            }
        )
    }
})