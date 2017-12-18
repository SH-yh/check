const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        userInfo: null,
        boundType: "",
        tip:0,
        studentFunction: [
            {
                name: '课程表',             
                iconPath:'../../../res/images/person/course.png',
                url: '/pages/common/timetable/timetable'
            },
            {
                name: '考勤记录',
                iconPath: '../../../res/images/person/check.png',
                url: '/pages/student/record/record'
            },
            {
                name: '请假',
                iconPath: '../../../res/images/person/ask.png',
                url: '/pages/student/ask/ask'
            },
        ],
        teacherFunction: [
            {
                name: '课程表',
                id:0,
                iconPath: '../../../res/images/person/course.png',
                url: '/pages/common/timetable/timetable',
            },
            {
                name: '考勤记录',
                id: 1,
                iconPath: '../../../res/images/person/check.png',
                url: '/pages/teacher/record/record',
            },
            {
                name: '假条处理',
                id: 2,
                iconPath: '../../../res/images/person/handle.png',
                url: '/pages/teacher/handleask/handleask',
            }
        ]
    },
    onLoad(options) {
        const self = this;
        this.setData({
            userInfo: app.userInfo,
            boundType: app.boundType
        });
        tool.getUserInfo((userInfo) => {
            const nickName = userInfo.nickName;
            if(app.boundType==1){//如果用户是老师身份，进行
                const conf = {
                    "url":"https://check.qianyanxu.com/teacher/informask",
                    "method":"POST",
                    "data":{
                        "openId": app.openId
                    }
                }
                tool.fetch(conf, (res)=>{
                    const tip = res.data.tip;
                    let teacherFunction = self.data.teacherFunction;
                    teacherFunction.map((item)=>{
                        if (item.id==2){
                            item.tip = tip;
                        }
                    });
                    if(tip != 0){
                        self.setData({
                            userInfo: userInfo,
                            teacherFunction: teacherFunction
                        });  
                    }else{
                        self.setData({
                            userInfo: userInfo
                        }); 
                    }
                });
            }else{
                self.setData({
                    userInfo: userInfo
                });  
            }
        })
    },
    onReady(){
    
    },

    onShow() {
        const self = this;
        tool.getUserInfo((userInfo) => {
            if (app.boundType == 1) {//如果用户是老师身份，进行
                const conf = {
                    "url": "https://check.qianyanxu.com/teacher/informask",
                    "method": "POST",
                    "data": {
                        "openId": app.openId
                    }
                }
                tool.fetch(conf, (res) => {
                    const tip = res.data.tip;
                    let teacherFunction = self.data.teacherFunction;
                    teacherFunction.map((item) => {
                        if (item.id == 2) {
                            item.tip = tip;
                        }
                    });
                    self.setData({
                        teacherFunction: teacherFunction
                    });
                });
            }
        })
    },
    onHide(){
    
    },
    onUnload() {
    
    },
    onPullDownRefresh() {
    
    },
    onReachBottom() {
    
    },
    onShareAppMessage() {
    
    },
    
})