"use strict";
const fs = require("fs");
const assist = require('./assist');
exports.getTodayCourse = (week, data)=>{
    const todayCourse = data.filter((item)=>{
        return item.week == week ? true : false;
    });
    return todayCourse.sort((pre, now)=>{
       return pre.start-now.start >0 ? true : false;
    });
};
exports.getCloseTwoCourse = (course)=>{
    const date = new Date();
    const nowHour = date.getHours();
    const nowMinutes = date.getMinutes();
    const nowMin = nowHour*60 + nowMinutes;//获取当前时间的总分钟
    const closeTwoCourse = course.filter((item, index)=>{
        if(index > 1){
           return false;
        }else{
            const timeSlot = item.time.split("-");
            const beginTime = timeSlot[0].split(":");
            const endTime = timeSlot[1].split(":");
            const beginMin = Number(beginTime[0])*60 + Number(beginTime[1]);//获取开始时间段的总分钟
            const endMin= Number(endTime[0]*60) + Number(endTime[1]);//获取结束时间段的总分钟
            //判断现在时间是否位于课程的时间段内，一共分为三种情况
            //第一种 现在时间位于时间段的前面
            if(nowMin < beginMin){
                item.tip = "即将上课";
               return true;
            }else if(beginMin < nowMin && nowMin < endMin) {//第二种现在时间位于时间段内
                item.tip = "正在上课";
                return true;
            }else{//第三种现在时间位于时间段后面
                return false
            }

        }
    });
    closeTwoCourse.length < 2 && closeTwoCourse.push({
        "tip":"休息时间",
        "wish":"主人您没课了，请尽情吩咐！"
    });
    return closeTwoCourse;
};
exports.tidyCourse = (course) => {
    let tidCourse = {};
    course.map((item)=>{
        const week = item.week;
        if(week in tidCourse){//如果在tidCourse里面已经有了该星期的建，则将其添加进去该星期数组
            tidCourse[week].push(item);
        }else{
            tidCourse[week] = [item];
        }
    });
    assist.fillCourse(tidCourse);
    return tidCourse;
};
exports.removedSomeKey = (key, data)=>{
    const record = Array.isArray(data) && data.map((item)=>{
        if(item[key]){
            delete item[key];
        }
        return item;
    });
    return record;
};
exports.getSomeKey = (key, data)=>{
    const result = Array.isArray(data) && data.map((item)=>{
            if(item[key]){
                return item[key];
            }
            return item;
        });
    return result;
};
exports.getSomeValue = (key, value, data)=>{
    const result = Array.isArray(data) && data.filter((item)=>{
            return item[key] == value ? true : false;
        });
    return result;
};
//获取当天日期
exports.getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const week = `星期${assist.convertDate(date.getDay())}`;
    const now = `${year}年${month}月${day}日`;
    return {
        date : now,
        week : week
    };
};
