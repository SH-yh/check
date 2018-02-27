const teacherList = require("./socket");
const db = require("../model/db");
const tool = require("../third/tool");
const url = require("url");
class CheckSystem {
    checkIn(wss){
        wss.on("connection", (ws, req)=>{
            const roomPath = decodeURI(req.url);
            ws.on('message', (message) => {
                this.handleMessage(ws, message, roomPath);
            });
        });
    }
    handleMessage(ws, message, roomPath){
        const {type} = JSON.parse(message);
        if(type == 1){ //如果用户是老师的话就把用户设为聊天室的管理员
            this.handleTeacherWx(ws, message, roomPath);
        }else if(type == -1){//如果是学生的把他加入相应聊天室
            this.handleStudentWx(ws, message, roomPath);
        }
    }
    handleTeacherWx(ws, message, roomPath){
        const data = JSON.parse(message);
        const {checkWay, course, courseId, lessonId} = data;
        const check = data.check;
        const id = +new Date();
        this.id = id;
        teacherList.addRoom(roomPath, ws, check);//创建聊天室
        teacherList.setKeyValue(roomPath, "checkStatus", true);//开启签到
        teacherList.setKeyValue(roomPath, "id", id);//设置Id
        //设置相应的考勤方式
        teacherList.setKeyValue(roomPath, "checkWay", checkWay);
        ws.on('close', ()=>{//如果老师关闭该连接的话，处理没有签到的同学
            this.handleUncheckStudent(roomPath, data);
        });
        //修改老师相应课程的考勤记录
        this.buildTeacherCheckRecord(data, (err, result)=>{
            //查询这门课一共有多少人
            if(result.n == 1){
                this.getStudentSum(course, courseId, lessonId, (result)=>{
                    teacherList[roomPath].totalMember = result;//把该老师这门课程的所有学生添加进来
                    ws.send(JSON.stringify({sum:result.length}));//发送老师这门课程一共有多少学生
                });
            }
        });
    }
    handleStudentWx(ws, message, roomPath){
        const data = JSON.parse(message);
        const {openId} = data;
        const room = teacherList[roomPath];//拿到相应的聊天室群
        if(data.query){//如果为真，表示学生端查询签到方式
            //向老师通知签到情况（人数）
            //更改学生考勤记录
            this.handleStudentCheckStatus(data, (err, result)=>{
                if(result.n != 0){
                    teacherList.addMember(roomPath, openId);
                    room.owner.send( JSON.stringify({"checkSum":++room.checkSum}));
                }
            });
        }else{
            if(!room){
                ws.send(JSON.stringify({"check":0}));//不可以签到
                return;
            }
            if(("checkStatus" in room) && room.checkStatus){//如果可以签到
                ws.send(JSON.stringify({"check":1,"checkWay":room.checkWay}));
                return;
            }
            if(!teacherList.checkExist(roomPath, openId)){//如果已经签到到了
                ws.send(JSON.stringify({"check":-1}));
                return;
            }
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
            "openId":1,
            "ask": 1,
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
        const {openId, courseId, lessonId, course, time, index} = data;
        const query = {
            "openId":openId,
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
            },
            "$inc":{
                "check.$.checkSum":1
            }
        };
        const collectionName = "student";
        db.updateSomething(collectionName, query, set, (err, result)=>{
            typeof cb == "function" && cb(err, result);
        })
    }
    handleUncheckStudent(roomPath, data){
        const room = teacherList[roomPath];
        const totalMember = room.totalMember;
        const member = room.member;
        //筛选没有签到的学生
        let unCheckMember = [];
        if(member.length == 0){
            unCheckMember = totalMember
        }else{
            totalMember.map((item)=>{
                member.map((usr)=>{
                    if(item.openId != usr){
                        unCheckMember.push(item);
                    }
                });
            });
        }
        this.handleUncheckStatus(roomPath, unCheckMember, data);
    }
    handleUncheckStatus(roomPath, member, data){
        member.map((item)=>{
            const status = this.handleAskStudentStatus(item, data);
            if(status != 0){//代表着老师已经处理了该假条，并且已经批准
                const collectionName = "student";
                const teacherQuery = {
                    "openId":stu.openId,
                };
                const set = {
                    "$pull":{
                        "ask":{
                            "id": ask.id
                        }
                    }
                };
                //删除学生该考勤的请假记录
                db.updateSomething(collectionName, teacherQuery, set , (err, res)=>{
                    if(!err || res.n != 0) {
                        const checkStatus = status == 1 ? 2: 1;
                        //设置相应的考勤状态
                        this.modifyStudentStatus(item, data, checkStatus,()=>{
                            teacherList.deleteRoom(roomPath)
                        });
                    }
                });
            }else{//代表老师没有处理该假条
                const checkStatus = 1;
                this.modifyStudentStatus(item, data, checkStatus,()=>{
                    teacherList.deleteRoom(roomPath)
                });
            }
        });
    }
    handleAskStudentStatus(stu, course){
        //只要reply.status不为0都需要删除学生的请假记录
        let reply = {
            status: 0,
        };
        const ask = stu.ask;
        const openId = stu.openId;
        ask.map((item, index)=>{
            const {stuDate, stuCourse, stuIndex, stuStatus, stuId, checkStatus} = item;
            const {checkDate, checkCourse, checkIndex} = course;
            if(stuCourse == checkCourse && stuDate ==  checkDate && checkIndex == stuIndex){//如果课程相同代表着该学生这门课程有请过假
                //代表当前考勤的这门课已经请了假了
                ask.id = stuId;
                if(stuStatus == 1 ){ //代表着该门课程的假条老师已经处理并且批准了。
                    if(checkStatus == 2){ //老师批准
                        reply.status = 1;
                    }else if(checkStatus == 1){//老师驳回
                        reply.status = 2;
                    }
                }else if(stuStatus == 0) {//代表着该门课程的假条老师还没有处理
                    //考勤系统自动将该假条状态修改为 1
                    const status = 1;
                    const collectionName = "student";
                    const query = {
                        openId: openId,
                        ask : {
                            "$elemMatch": {
                                date: checkDate,
                                course:checkCourse,
                                index: checkIndex
                            }
                        }
                    };
                    const set = {
                        "$set": {
                            "ask.$.status": status
                        }
                    };
                    db.updateSomething(collectionName, query, set);
                    reply.status = 0;
                }
            }
        });
        return reply.status;
    }
    //修改学生的考勤记录
    modifyStudentStatus(item, data, status, cb){
        const collectionName = student;
        const {course, index, time} = data;
        const {week, date} = tool.getDate();
        const query = {
            "openId":item.openId,
            "check.course":course
        };
        const set = {
            "$push":{
                "check.$.checkStatus":{
                    "id" : this.id,
                    "date" : date,
                    "time" : time,
                    "week" : week,
                    "index" : index,
                    "checkStatus" : status
                }
            },
            "$inc":{
                "check.$.unCheckedSum":1
            }
        };
        db.updateSomething(collectionName, query, set, ()=>{
            //先关闭签到接口
           typeof cb == "function" && cb();
        });

    }
};

const check = new CheckSystem();


module.exports = {
    "check": check,
};