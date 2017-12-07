const tool = require('../../../res/third/tool.js');
Page({
    data: {
        course: null,
        week:['周一','周二','周三','周四','周五','周六','周日'],
        count:['',1,2,3,4,5,6,7,8,9,10,11]
    },
    onLoad(){
        tool.fetchData((data) => {
            let newDate = tool.fillCourse(data);
            this.setData({ course: newDate});
        })
    }
})