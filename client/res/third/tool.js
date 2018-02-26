const assit = require('./assist.js');
const app = getApp();
exports.getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = `星期${assit.convertDate(date.getDay())}`;
  const now = `${year}年${month}月${day}日`;
  return {
    date : now,
    week : week
  };
}

//进行绑定
exports.fetch = (conf, callback)=>{
   wx.request({
       url: conf.url,
       method: conf.method,
       dataType: "json",
       data: conf.data,
       success: (data) => {
           typeof callback == "function" && callback(data);
       }
   })
}
exports.getUserInfo = (callback)=>{
    wx.login({
        success: res => {
            wx.getUserInfo({
                success: (res) => {
                    if (callback) {
                        callback(res.userInfo)
                    }
                }
            })
        }
    });
}


//获取绑定信息
exports.fetchIdentity = (conf, callback)=>{
    wx.login({
        success: res => {
            const code = res.code;//拿到res.code去换取openId及绑定信息
            wx.request({
                url: conf.url,
                method: "POST",
                data: {
                    code: code
                },
                success: (res) => {
                    typeof callback == "function" && callback(res.data);
                },
                fail:(res)=>{
                console.log(res);
                }
            })
        }
    });
}


exports.addColor = (data) => {
    const length = data.length;
    for (let i = 0; i < length; i++){
        let item = data[i];
        item.color = assit.randomColor();
    }
    return data;
}
exports.searchSomething = (obj, data) =>{

    let target = [];
    const length = data.length;
    for(let i = 0; i < length; i++){
        const item = data[i];
        if (item[obj.key] == obj.value) {
            target.push(item);
            return target;
        }
    }
    return false;
}
exports.checkTodayCourse = (target, course, time,teacherName)=>{
    return target.some((item)=>{
        if (item.course == course && item.time == time && item.teacher == teacherName){
            return true;
        }else{
            return false;
        }
    });
}
exports.showToast = (title, duration = 2000)=>{
    wx.showToast({
        title: title,
        duration: duration,
        image: "../../../res/images/public/info.png",
    })
}
exports.webSocket = (url, message, cb)=>{
    wx.connectSocket({
        "url": encodeURI(url),
        "method": "GET"
    })
    wx.onSocketOpen(function (res) {
        const data = JSON.stringify(message);
        wx.sendSocketMessage({
            "data": data
        });
        typeof cb == "function" && cb();
    })
    wx.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！')
    });
}
exports.webSocketOnMessage = (cb)=>{
    wx.onSocketMessage((res) => {
        typeof cb == "function" && cb(res);
    });
}
exports.getTeacherStatus = (courseInfo)=>{
    const firstCourse = courseInfo[0];
    if ("wish" in courseInfo[0] || courseInfo[0].tip == "即将上课"){
        return false;
    }else{
        return true;
    }
}
function toRad(d) { return d * Math.PI / 180; }
exports.getGpsDistance = (lat1, lng1, lat2, lng2)=> {
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return (dis * 6378137).toFixed(1);
}
