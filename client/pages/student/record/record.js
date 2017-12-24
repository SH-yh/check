const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    queryValue :"",
    data: {
        "checkReaord":null,
        "page":0
    },

    onLoad: function (options) {
        const conf = {
            url: 'https://check.qianyanxu.com/student/course/checkrecord',
            data: {
                "openId": app.openId
            },
            method: 'POST'  
        }
        tool.fetch(conf, (result)=>{
            const record = tool.addColor(result.data.record.check);
            if (result.statusCode == 200){
                wx.getSystemInfo({
                    success: (res) => {
                        this.setData({
                            scrollHeight: res.windowHeight - 120,
                            checkReaord: record
                        });
                    }
                })
               
            }
        })
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
    onShareAppMessage: function () {
    
    },
    handleQuery(e){
        this.queryValue = e.detail.value;
    },
    handleSeacher(){
        const checkReaord = this.data.checkReaord;
        const result = tool.searchSomething({
            key: 'course',
            value: this.queryValue
        }, checkReaord);
        result ? this.setData({ checkReaord: result }) : wx.showToast({
            title: '无该课程',
            duration:2000
        })
    }
})