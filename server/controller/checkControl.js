const teacherList = require("./socket");
const db = require("../model/db");
const tool = require("../third/tool");
const url = require("url");
class CheckSystem {
    checkIn(wss){
        wss.on("connection", (ws, req)=>{
            const roomPath = req.url;
            ws.on('message', (message) => {
                this.handleMessage(ws, message, roomPath);
            });
            ws.on('close', (message) => {
                this.handleClose(ws, message, roomPath);
            });
        });

    }
    handleMessage(ws, message, roomPath){
        const {type} = data;
        if(type == 1){ //如果用户是老师的话就把用户设为聊天室的管理员
            this.handleTeacherWx(ws, message, roomPath);
        }else if(type == -1){//如果是学生的把他加入相应聊天室
            this.handleStudentWx(ws, message, roomPath);
        }
    }
    handleTeacherWx(ws, message, roomPath){
        const data = JSON.parse(message);
        const {type, openId, checkWay, course, courseId, lessonId} = data;
        const check = data.check;
        const id = +new Date();
        this.id = id;
        teacherList.addRoom(roomPath, ws, check);//创建聊天室
        teacherList.setKeyValue(roomPath, "checkStatus", true);//开启签到
        teacherList.setKeyValue(roomPath, "id", checkWay);//设置Id
        //设置相应的考勤方式
        teacherList.setKeyValue(roomPath, "checkWay", id);
        //修改老师相应课程的考勤记录
        this.buildTeacherCheckRecord(data, (err, result)=>{
            //查询这门课一共有多少人
            if(result.n == 1){
                this.getStudentSum(roomPath, course, courseId, lessonId, (result)=>{
                    teacherList[roomPath].totalMember = result;
                    ws.send(result.length);//发送老师这门课程一共有多少学生
                });
            }
        });

    }
    handleStudentWx(ws, message, roomPath){
        const data = JSON.parse(message);
        const {type, openId, checkWay} = data;
        const room = teacherList[roomPath];//拿到相应的聊天室群
        if(!room){
            wx.send(JSON.stringify({"check":1}));//不可以签到
            return;
        }
        if(("check" in room) && !room.check){//如果可以签到
            ws.send(JSON.stringify({"check":0}));
            return;
        }
        if(!teacherList.addMember(roomPath, openId)){//如果已经签到到了
            ws.send(JSON.stringify({"check":-1}));
            return;
        }
        const {query} = message;
        if(query){//如果为真，表示学生端查询签到方式
            wx.send(JSON.stringify({"checkWay":room.checkWay}))
        }else{//学生端通过了考勤检测，可以向老师端进行提交
            //向老师通知签到情况（人数）
            //更改学生考勤记录
            this.handleStudentCheckStatus(data, (err, result)=>{
                if(result.n != 0){
                    room.owner.send( JSON.stringify({"checkSum":room.checkSum}));
                }
            });
        }
    }
    getStudentSum( course, courseId, lessonId, cb){
        const query = {
            "courseList":{
                "$elemMatch":{
                    "course":course,
                    "courseId":courseId,
                    "lessonId":lessonId
                }
            }
        };
        const assign = {
            "openId":1
        };
        const collectionName = "student";
        db.getMany(collectionName, query, assign, (res) =>{
            //将所有的学生添加进聊天室
            typeof cb == "function" && cb(res);
        })
    }
    buildTeacherCheckRecord(teacherInfo, cb){
        //向老师数据库中添加考勤记录
        //需要老师的openId,该课程的课程号，课序号，
        const {openId, course, time} = teacherInfo;
        const query = {
            "openId":openId,
            "check.course":course
        };
        const {week, date} = tool.getDate();
        const set = {
            "$push":{
                "check.$.checkList":{
                    "id" : this.id,
                    "date" : date,
                    "time" : time,
                    "week" : week,
                }
            },
            "$inc":{
                "check.$.checkSum":1,
            }
        };
        const collectionName = "teacher";
        db.updateMay(collectionName, query, set, (err, result)=>{
            typeof cb == "function" && cb(err, result);
        })
        //需要插入的信息有考勤的id，考勤日期，考勤时间（10：10-11：50），课程index
    }
    handleStudentCheckStatus(data, cb){
        const {courseId, lessonId, course, time, index} = data;
        const query = {
            "courseList":{
                "$elemMatch":{
                    "courseId" : courseId,
                    "lessonId" : lessonId,
                }
            },
            "check.course" : course
        };
        const {week, date} = tool.getDate();
        const set = {
            "$push":{
                "check.$.checkStatus":{
                    "id" : this.id,
                    "date" : date,
                    "time" : time,
                    "week" : week,
                    "index" : index,
                    "checkStatus" : "0"
                }
            }
        };
        const collectionName = "student";
        db.updateSomething(collectionName, query, set, (err, result)=>{
            typeof cb == "function" && cb(err, result);
        })
    }
    handleClose(ws, message, roomPath){
        
    }
};

const check = new CheckSystem();
const getQuery = (query) =>{
    const queryObj = {};
    query.replace(/((\w+)=(\w+))&&*/g, (item, firstSub, secondSub, thirdSub)=>{
        queryObj[secondSub] = thirdSub;
    });
    return queryObj;
};

module.exports = {
    "check": check,
};