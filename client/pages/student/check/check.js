const tool = require('../../../res/third/tool.js');
const app = getApp();
const getStudentLoaction = (callback)=>{
    wx.getSystemInfo({
        success: (res) => {
            const windowHeight = res.windowHeight;
            const windowWidth = res.windowWidth;
            wx.getLocation({
                type: 'gcj02',
                success: (data) => {
                    const conf = {
                        mapHeight: windowHeight,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        accuracy: data.accuracy,
                        controls: [
                            {
                                id: 1,
                                iconPath: '/res/images/check/check.png',
                                position: {
                                    left: windowWidth / 2 - 32,
                                    top: windowHeight - 140,
                                    width: 64,
                                    height: 64
                                },
                                clickable: true
                            }
                        ]
                    };
                    if(callback){
                        callback(conf);
                    }
                }
            });
        }
    })
}
exports.getStudentLoaction = getStudentLoaction;
exports.queryCheck = () => {
    return new Promise((resolve, reject)=>{
        const courseInfo = app.courseInfo[0];
        if (courseInfo.tip == "正在上课") {
            const { courseId, lessonId, index, time, course, teacher,week } = courseInfo;
            const url = `wss://check.qianyanxu.com/check/${week}/${courseId}/${lessonId}`;
            const message = {
                "openId": app.openId,
                "type": "-1",
                "query":false
            }
            tool.webSocket(url, message);
            wx.onSocketMessage((data) => {
                resolve(JSON.parse(data.data));
                wx.closeSocket();
            });
        } else {
            resolve({check:0});
        }
    });
}
exports.handleCheckWay = (self, checkMark, checkWay) => {
    const way = checkWay.way;
    if (way == "gps"){
        getStudentLoaction((conf) => {
            self.setData({
                checkWay: checkWay,
                studentConf: conf,
                boundType: app.boundType
            });
        });
    } else if (way == "random") {
        self.setData({
            checkWay: checkWay,
            boundType: app.boundType
        });  
    }
}
exports.handleCheck = ()=> {
    if (!app.checkMark) {
        const teacherLocation = this.checkWay.location;
        const t_longitude = teacherLocation.longitude;
        const t_latitude = teacherLocation.t_latitude;
        const studentLocation = this.studentConf;
        const s_longitude = studentLocation.longitude;
        const s_latitude = studentLocation.latitude;
        if (s_latitude == t_latitude && t_longitude == s_longitude) {
            verify();
        }else{
            tool.showToast("请到教室！");
        }
    } else {
        tool.showToast("您已答道");
    }
}
exports.handleDelKeyItem = function(e){
    const inputValue = this.data.random;
    const length = inputValue.length;
    for (let i = length - 1; i >= 0; i--) {
        if (inputValue[i] != "") {
            inputValue[i] = "";
            this.setData({
                random: inputValue
            });
            return;
        }
    }
}
exports.handleKeyItem = function(e){
    const id = e.target.id;
    const inputValue = this.data.random;
    const length = inputValue.length;
    for (let i = 0; i < length; i++){
        if(inputValue[i] == ""){
            inputValue[i] = id;
            this.setData({
                random: inputValue
            });
            return;
        }
    }
}
exports.handleCheckRandom = function(){
    if (!app.checkMark){
        const usrValue = this.data.random.join("");
        const random = this.data.checkWay.random.join("");
        if (usrValue == random) { //签到成功
            verify();
        } else {
            tool.showToast("口令错误");
        }
    }else{
        tool.showToast("您已答道");
    }
}
const verify = ()=>{
    const courseInfo = app.courseInfo[0];
    const { courseId, lessonId, index, time, course, teacher, week } = courseInfo;
    const url = `wss://check.qianyanxu.com/check/${week}/${courseId}/${lessonId}`;
    const message = {
        "query": true,
        "type": -1,
        "openId": app.openId,
        "courseId": courseId,
        "lessonId": lessonId,
        "time": time,
        "index": index,
        "course": course
    };
    tool.webSocket(url, message, () => {
        wx.closeSocket();
        app.checkMark = true;
        tool.showToast("签到成功");
        setTimeout(() => {
            wx.switchTab({
                url: '/pages/common/index/index',
            })
        }, 2000);
    });
}