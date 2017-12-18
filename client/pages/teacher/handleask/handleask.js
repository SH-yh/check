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
        const askChange = this.askChange;
        const conf = {
            "url":"https://check.qianyanxu.com/teacher/handleask",
            "data":{
                "askChange": askChange,
                "openId":app.openId
            },
            "method":"POST"
        }
        tool.fetch(conf);
    },
    onPullDownRefresh: function () {
    
    },
    onReachBottom: function () {
    
    },
    onShareAppMessage: function () {
    
    },
    handleAsk(e){//处理结果 0 ： 批准 后台把该学生此次考勤的状态改为假，1 ： 改为缺勤
        const checkStatus = e.detail.value;
        const id = e.target.dataset.id;
        const askList = this.data.askList;
        let newList = [];
        askList.map((item)=>{
            if (item.id == id){
                item.checkStatus = checkStatus ;
                this.askChange.push(item);
                return;
            }
            newList.push(item);
        });
        this.setData({ askList: newList});
    },
    handleLook(e){
        const path = e.target.dataset.path;
        const imgPath = path.match(/(\d+\.\w+)$/g)[0];
        wx.previewImage({
            urls: [`https://check.qianyanxu.com/teacher/displayask/${imgPath}`],
            err:(err)=>{
                err && tool.showToast("查看失败");
            }
        });
    }
})