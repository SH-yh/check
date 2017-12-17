const tool = require('../../../res/third/tool.js');
Page({
    recordChangeCase:[],
    data: {
        scrollHeight:'400',
        recordCase:null,
        status:['已到', '缺勤', '请假', '补签']
    },
    onLoad: function (options) {
        const { id, course, lessonId, courseId}= options;
        wx.getSystemInfo({
            success: (setting) => {
                const conf = {
                    "url":"https://check.qianyanxu.com/teacher/course/record/history/recordcase",
                    "method":"POST",
                    "data":{
                        id: id, 
                        course: course, 
                        lessonId: lessonId, 
                        courseId: courseId
                    }
                }
                tool.fetch(conf, (res)=>{
                    this.setData({
                        scrollHeight: setting.windowHeight - 140,
                        recordCase: res.data.caseItem
                    });
                })
            }
        })        
    },
    onReady: function () {
    
    },


    onShow: function () {
    },
    onHide: function () {

    },

    onUnload: function () {
        //在页面离开的时候吧修改后的数据recordChangeCase发送到服务器进行修改
        const changeCase  = this.recordChangeCase;
        if (changeCase.length != 0){
            const conf = {
                "url": "https://check.qianyanxu.com/teacher/course/record/checkstatus",
                "method": "POST",
                "data": {
                    changeCase: changeCase
                }
            }
            tool.fetch(conf, (res) => {
                if (res.data.result == 1){
                    tool.showToast("修改成功")
                }else{
                    tool.showToast("修改失败");
                }
            });
        }
    },
    onPullDownRefresh: function () {
    
    },
    onReachBottom: function () {
    
    },
    onShareAppMessage: function () {
    
    },
    bindPickerChange(e){
        const id = e.target.id;
        const data = setStatus(id, this.data.recordCase, this.recordChangeCase);
        this.setData({recordCase:data});
        function setStatus(value, target, arr){
            const newData = target.map((item, index)=>{
                if (item.account == value){
                
                    item.checkStatus = e.detail.value;
                    if(!item.color){
                        item.color = "#f00";
                    } 
                    if (arr.length == 0){
                        arr.push(item);
                    }else{
                        arr.forEach((target)=>{
                            if (target.account == value) {
                                target.checkStatus = e.detail.value;
                            }
                        }); 
                    }
                }
                return item;
            });
            return newData;
        }
    }
})