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

exports.fetchCheckRecord = (conf, callback) => {
    const data = [
            {
                "course": "数据仓库与数据挖掘",
                "id": 321456,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "site": 'A3-202'
            },
            {
                "course": "数字图像处理",
                "id": 456972,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "site": 'A6-302'
            },
            {
                "course": "算法",
                "id": 5698742,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "site": 'A4-305'
            },
            {
                "course": "数据结构",
                "id": 78964,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "site": 'A4-305'
            },
            {
                "course": "离散",
                "id": 5698742,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "site": 'A4-305'
            },
        ];
    if (callback) {
        callback(data);
    }
    /*
    wx.request({
        url: url,
        dataType: "json",
        success: (data) => {
            if (callback) {
                callback(data);
            }
        }
    })
    */
}
exports.fetchCheckedMessage = (conf, callback) => {
    const data = {
        course: "数据结构",
        message: [
            {
                date: "2017年10月1日",
                week:"周一",
                index:"6-7",
                checkStatus:"0"
            },
            {
                date: "2017年10月3日",
                week: "周一",
                index: "6-7",
                checkStatus: "2"
            },
            {
                date: "2017年10月5日",
                week: "周一",
                index: "5-8",
                checkStatus: "3"
            },
            {
                date: "2017年10月7日",
                week: "周四",
                index: "9-10",
                checkStatus: "0"
            },
            {
                date: "2017年10月3日",
                week: "周三",
                index: "1-3",
                checkStatus: "0"
            },
        ]
    }
    if (callback) {
        callback(data);
    }
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
    wx: wx.showToast({
        title: title,
        duration: duration,
    })
}