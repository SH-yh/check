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
    let count = 0;
    const closeTwoCourse = course.filter((item, index)=>{
        if(count == 2){
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
                count++;
               return true;
            }else if(beginMin < nowMin && nowMin < endMin) {//第二种现在时间位于时间段内
                item.tip = "正在上课";
                count++;
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
        const week = item.week == "0" ? 7 : item.week;
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
exports.addColor = (data) => {
    const length = data.length;
    for (let i = 0; i < length; i++){
        let item = data[i];
        item.color = assist.randomColor();
    }
    return data;
};
//整合老师全部考勤信息
exports.tidyRecord = (item) => {
    const courseList = item.courseList;
    const check = item.check;
    const result = [];
    check.map((item)=>{
        const courseName = item.course;
        const checkNum = item.checkList.length;
        let obj = {
            "course":courseName,
            "checkNum":checkNum,
            "lessonId":item.lessonId,
            "courseId":item.courseId
        };
        //获取每门课的对应的班级
        courseList.map((course)=>{
            if(course['course'] == courseName){
                obj.major = course.major;
                obj.class = course.class;
                obj.grad = course.grad;
            }
        });
        result.push(obj);
    });
    return result;
};
exports.getHistoryRecord = (item, lessonId, courseId)=>{
    return item.filter((item)=>{
        if(item.lessonId == lessonId && item.courseId == courseId){
            return true;
        }else{
            return false;
        }
    })
};
exports.getRecordCase = (item, courseName)=>{
    let caseArray = [];
    item.map((record)=>{//开始遍历每一个同学的考勤情况
        const check = record.check;
        let caseObj = {};
        check.map((caseItem)=>{//拿到该学生所有课程的考勤情况
            if(caseItem.course == courseName){//拿到某一课程的考勤情况
                const name = record.name;
                const account = record.account;
                let checkNum = 0;//记录签到次数
                let askNum = 0;//记录请假次数
                let unCheckNum = 0;//记录缺勤次数
                let lateNum = 0;
                let checkStatus = caseItem.checkStatus;
                //开始该同学该课程统计考勤情况
                checkStatus.map((status)=>{
                    switch(status.checkStatus){
                        case "0"://签到
                            checkNum++;
                            break;
                        case "1"://缺勤
                            unCheckNum++;
                            break;
                        case "2"://请假
                            askNum++;
                            break;
                        case "3"://补签
                            lateNum++;
                            break;
                        default:
                            break;
                    }
                });
                //开始包装对象
                caseObj.name = name;
                caseObj.account = account;
                caseObj.checkNum = checkNum;
                caseObj.askNum = askNum;
                caseObj.unCheckNum = unCheckNum;
                caseObj.lateNum = lateNum;
                caseArray.push(caseObj);
            };
        })
    });
    return caseArray;
};
exports.getRecordCaseItem = (item, id, course)=>{
    let studentObj = [];
    item.map((student)=>{//获取符合条件的同学
        const check = student.check;
        check.map((checkItem)=>{
            if(checkItem.course == course){
                const account = student.account;
                const name = student.name;
                let caseItem = {};
                const checkStatus = checkItem.checkStatus;
                checkStatus.map((statusItem)=>{
                    if(statusItem.id == id){
                        caseItem.name = name;
                        caseItem.account = account;
                        caseItem.checkStatus = statusItem.checkStatus;
                        caseItem.id = id;
                        caseItem.course = course;
                        studentObj.push(caseItem);
                    }
                });
            }
        });
    });
    return studentObj;
};
exports.getCheckStatus = (item, course, status, id)=>{
    const check = item.filter((target)=>{
        if(target.course == course){
            const checkStatus = target.checkStatus;
            checkStatus.map((statusItem)=>{
                if(statusItem.id == id){
                    statusItem.checkStatus = status;
                };
            });
            return true;
        }
    });
    return check;
};
exports.setCheckStatus = (item, course, status, date, time)=>{
    const check = item.filter((target)=>{
        if(target.course == course){
            const checkStatus = target.checkStatus;
            checkStatus.map((statusItem)=>{
                if(statusItem.date == date && statusItem.time == time){
                    statusItem.checkStatus = status;
                };
            });
            return true;
        }
    });
    return check;
};
