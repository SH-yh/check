const tool = require('../../../res/third/tool.js');
Page({
    queryValue :"",
    data: {
        "checkReaord":null,
        "page":0
    },

    onLoad: function (options) {
        const conf = {
            url: 'https://www.check.qianyanxu.com/record/courses',
            dataType: 'json',
            method: 'POST'  
        }
        tool.fetchCheckRecord(conf,(data)=>{
            tool.addColor(data);
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        scrollHeight: res.windowHeight - 120,
                        recordCase: data,
                        checkReaord: data
                    });
                }
            })
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