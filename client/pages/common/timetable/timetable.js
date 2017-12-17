const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        course: null,
        week:['周一','周二','周三','周四','周五','周六','周日'],
        count:['',1,2,3,4,5,6,7,8,9,10,11]
    },
    onLoad(){
        const conf = {
            "url":"https://check.qianyanxu.com/base/course/table",
            "data":{
                "type":app.boundType,
                "openId": app.openId
            },
            "method":"POST"
        }
        tool.fetch(conf,(res) => {
            if (res.statusCode){
                console.log(res.data.course);
                this.setData({ course: res.data.course });
            }
        })
    }
})