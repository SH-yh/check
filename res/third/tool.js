const assit = require('./assist.js');
exports.getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const week = `星期${assit.convertDate(date.getDay())}`;
  const now = `${year}年${month}月${day}日`;
  return {
    date : now,
    week : week
  };
}
exports.fetchCourse = (callback)=>{
    const data = {
        "boundMark": false,
        "first": {
            "tip":"当前课程",
            "name": "数据结构",
            "site": "A6-301",
            "time": "8:00-9:40"
        },
        "next": {
            "tip": "下一节课",
            "name": "计算机网络",
            "site": "A3-603",
            "time": "10:10-11:50"
        }
    }
    if(callback){
        callback(data);
    }
    /*
    wx.request({
        url: "",
        method: "POST",
        dataType: "json",
        success: (date)=>{
            if(callback){
                callback(date);
            }
        }
    })
    */
}
exports.boundIdentity = (query, callback)=>{
    const data = {
        ok:1,
        boundMark: 1
    }
    if (callback){
        callback(data);
    }
    /*
   wx.request({
       url: "",
       method: "POST",
       dataType: "json",
       success: (date) => {
           if (callback) {
               callback(date);
           }
       }
   })
   */
}
exports.getUserInfo = (callback)=>{
    wx.login({
        success: res => {
            wx.getUserInfo({
                success: (res) => {
                    if (callback){
                        callback(res.userInfo)
                    }
                }
            })
        }
    });
}
exports.fetchData = (callback) => {
    const data = {
            "1":[
                {   "course": "数据仓库与数据挖掘",
                    "start": 1,
                    "gap":2,
                    "room": 'A3-202'
                }, 
                {
                    "course": "数字图像处理",
                    "start": 3,
                    "gap": 2,
                    "room": 'A6-302'
                },     
                {
                    "course": "移动端开发",
                    "start": 9,
                    "gap": 2,
                    "room": 'A4-305'
                },     
            ],
            "2":[
                {
                    "course": "计算机图形学",
                    "start": 7,
                    "gap": 2,
                    "room": 'A6-315'
                }
            ],
            "4":[
                {
                    "course": "计算机图形学",
                    "start": 5,
                    "gap": 4,
                    "room": 'A4-305'
                }
            ],
            "7":[
                {
                    "course": "就算计图形学",
                    "start": 3,
                    "gap": 3,
                    "room": 'A6-105'
                }
            ]
    }
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
exports.fetchCheckRecord = (conf, callback) => {
    const data = [
            {
                "course": "数据仓库与数据挖掘",
                "id": 321456,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A3-202'
            },
            {
                "course": "数字图像处理",
                "id": 456972,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A6-302'
            },
            {
                "course": "算法",
                "id": 5698742,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "course": "数据结构",
                "id": 78964,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "course": "离散",
                "id": 5698742,
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            /*
            {
                "course": "高数",
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "id":78964,
                "course": "语文",
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "id":5698742,
                "course": "英语",
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "id":456972,
                "course": "毛概",
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            {
                "id":321456,
                "course": "思修",
                "checked": 12,
                "unChecked": 3,
                "vacate": 1,
                "teacher": 'HY',
                "room": 'A4-305'
            },
            */
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
                checked:"已签"
            },
            {
                date: "2017年10月3日",
                week: "周一",
                index: "6-7",
                checked: "假"
            },
            {
                date: "2017年10月5日",
                week: "周一",
                index: "5-8",
                checked: "已签(补)"
            },
            {
                date: "2017年10月7日",
                week: "周四",
                index: "9-10",
                checked: "已签"
            },
            {
                date: "2017年10月3日",
                week: "周三",
                index: "1-3",
                checked: "已签"
            },
        ]
    }
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
exports.fetchIdentity = (conf, callback)=>{
    const data = '1';//1为老师 -1 为学生 0 是没有绑定
    if(callback){
        callback(data);
    }
    /*
    wx.request({
        url: ,
    })
    */
}
exports.fillCourse = (data) => {
    for(let key in data){
        const target = data[key];
        const length = target.length;
        if (target[0].start > 1) {
            for (let i = 0; i < target.length;i++){
                const item = target[i];
                assit.fill(target);
            }
        }
        for (let i = 0; i < target.length; i++) {
            const item = target[i];
            let obj = assit.findStart(target);
            const index = item.start + item.gap;
            if (obj.indexOf(index) == -1 && index < 12) {
                target.splice(i + 1, 0, {
                    "start": index,
                    "gap": 1,
                })
            }
        }
        courseColor(data);
    }
    return data;
}
const courseColor = (arg) => {
    for (let key in arg) {
        const target = arg[key];
        const length = target.length;
        for (let i = 0; i < length; i++) {
            const item = target[i];
            if (item.gap != 1) {
                item.color = assit.randomColor();
            }
        }
    }
}
exports.addColor = (data) => {
    const length = data.length;
    for (let i = 0; i < length; i++){
        let item = data[i];
        item.color = assit.randomColor();
    }
}