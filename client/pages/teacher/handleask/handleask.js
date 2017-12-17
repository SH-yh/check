const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
    askChange:[],  
    data: {
        askList:null,
        handleType:['批准', '驳回']
    },
    onLoad: function (options) {
        this.askChange=[];
        const conf = {
            "url":"https://check.qianyanxu.com/teacher/asklist",
            "method":"POST",
            "data":{
                "openId": app.openId
            }
        }
        tool.fetch(conf, (res)=>{
            console.log(res.data.ask);
            if (res.statusCode == 200 && res.data.ask ){
                this.setData({ askList: res.data.ask });
            }
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
    handleAsk(e){//处理结果 0 ： 批准 后台把该学生此次考勤的状态改为假，1 ： 改为缺勤
        const handleType = e.detail.value;
        const id = e.target.dataset.id;
        const askList = this.data.askList;
        let newList = [];
        askList.map((item)=>{
            if (item.id == id){
                item.handleType = handleType ;
                this.askChange.push(item);
                return;
            }
            newList.push(item);
        });
        this.setData({ askList: newList});
    },
    handleLook(e){
        const path = e.target.dataset.path;
        const conf = {
            "url":"https://check.qianyanxu.com/teacher/displayAsk",
            "method":"POST",
            "data":{
                "imagePath":path
            }
        }
        tool.fetch(conf, (res)=>{
            wx.previewImage({
                urls: ["https://check.qianyanxu.com/upload/ask/1513521756114.png"],
                fail:(err)=>{
                    console.lof(err);
                }
            });
        });
    }
})