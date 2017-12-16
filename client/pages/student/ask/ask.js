const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    "filePath":"",
    "courseName":"",
    "teacherName":"",
    "time":"",
    data: {
        "btnState":"上传假条",
        "askSrc":"../../../res/images/ask/ask.png",
        "todayCourse":null
    },
    onLoad(options) {
        //获取当天的课程
        const openId = app.openId;
        const conf = {
            url:"https://check.qianyanxu.com/base/course",
            method:"POST",
            data:{
                "openId": openId,
                "type": app.type,
                "mark":1
            }
        }
        tool.fetch(conf, (res)=>{
            const result = res.data;
            if (res.statusCode && !("tip" in result)){
                this.setData({
                    "todayCourse": result.course
                });
            }
        });
    },
    onReady() {
    
    },
    onShow() {
        
    },
    onHide() {
    
    },
    onUnload() {
    
    },
    onPullDownRefresh() {
    
    },
    onReachBottom() {
    
    },
    onShareAppMessage() {
    
    },
    chooseImage(){
        const self = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                self.filePath = tempFilePaths[0];
                 self.setData({
                    btnState: '确认上传',
                    askSrc: tempFilePaths,
                });
            }
        })
        
    },
    handleInputChange(e){
        const id = e.target.id;
        const value = e.detail.value;
        switch(id){
            case "courseName":
                this.courseName = value;
                break;
            case "teacherName":
                this.teacherName = value;
                break;
            case "time":
                this.time = value;
                break
            default:
                break;
        }
    },
    handleAskBtn(){
        const { courseName, teacherName, time} = this;
        const self = this;
        if (!self.filePath){
            tool.showToast('请上传假条');
        } else if (tool.checkTodayCourse(this.data.todayCourse), courseName, teacherName, time){
            wx.uploadFile({
                url: 'https://check.qianyanxu.com/student/ask',
                filePath: self.filePath,
                name: 'askPng',
                header: {
                    header: "multipart/form-data"
                },
                formData: {
                    'openId': app.openId,
                    'course': courseName,
                    'time': time,
                    'teacherName': teacherName
                },
                success: (res) => {
                    tool.showToast('请假成功');
                }
            })
        }else{
            tool.showToast('请输入当天课程');
        }
    }
})