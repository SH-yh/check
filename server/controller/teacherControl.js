"use strict";
const db = require('../model/db');
const collectionName = "teacher";
const tool = require('../third/tool');
//老师所有课程的考勤记录
exports.record = (req, res, next) => {
    const {openId} = req.body;
    const query = {
        openId:openId
    };
    //courseList记录的是老师的课程
    //check记录的是老师每门课程的每一次的考勤信息
    const assign = {
        "courseList":1,
        "check":1,
    };
    db.getSomething(collectionName, query, assign, (result)=>{
        if(result){
            const record = tool.tidyRecord(result);
            res.json({"record":record});
        }else{
            res.json({"record":0});
        }
    })
};
//老师某门课程的考勤记录概况
exports.recordCase = (req, res, next) => {
    const {course,courseId, lessonId} = req.body;
    const queryCollectionName = "student";
    const query = {
        "courseList":{
            "$elemMatch":{
                "courseId":courseId,
                "lessonId":lessonId
            }
        }
    };
    const assign = {
        "name":1,
        "account":1,
        "check": 1
    };
    db.getMany(queryCollectionName,query, assign, (result)=>{
        if(result){
            const recordCase = tool.getRecordCase(result, course);
            res.json({caseRecord:recordCase})
        }else{
            res.json({caseRecord:0})
        }
    })
};
//某班某课程的历史考勤记录
exports.history = (req, res, next) => {
    const {openId, lessonId, courseId} = req.body;
    const query = {
        "openId":openId,
        "check":{
            "$elemMatch":{
                "lessonId":lessonId,
                "courseId":courseId
            }
        },
    };
    const assign = {
        "check.courseId" : 1,
        "check.lessonId" : 1,
        "check.checkList":1
    };
    db.getSomething(collectionName, query, assign, (result)=>{
        if(result){
            const record = tool.getHistoryRecord(result.check,lessonId, courseId);
            res.json({"record":record[0]});
        }else{
            res.json({"record":0});
        }
    })
};
//某班某一课程历史考勤记录学生情况
exports.recordCaseItem = (req, res, next) => {
    const {id, course, lessonId, courseId} = req.body;
    const queryCollectionName = "student";
    const query = {//去查询学生的课程里有没有改课程
        "courseList":{
            "$elemMatch":{
                "lessonId":lessonId,
                "courseId":courseId
            }
        }
    };
    const assign ={
        "name":1,
        "account":1,
        "check":1
    };
    db.getMany(queryCollectionName, query, assign, (result)=>{
        if(result){
           const caseItem = tool.getRecordCaseItem(result, id, course);
           res.json({
               "caseItem":caseItem
           });
        }else{
            res.json({
                "caseItem":0
            });
        }
    })
};
//学生考勤状态修改
exports.checkStatus = (req, res, next) => {
    const changeCase = req.body.changeCase;
    changeCase.map((item)=>{
        const {account, course, checkStatus, id} = item;
        const queryCollectionName = "student";
        const query = {
            account:account,
            check:{
                "$elemMatch":{
                    "course":course,
                    "checkStatus.id":id
                }
            }
        };
        const assign = {
            "check.checkStatus":1,
            "check.course":1
        };
        db.getSomething(queryCollectionName, query, assign, (result)=>{
            const newCheckStatus = tool.getCheckStatus(result.check, course, checkStatus, id);
            const status = newCheckStatus[0].checkStatus;
            const set = {
                "$set":{
                    "check.$.checkStatus":status
                }
            };
            db.updateSomething(queryCollectionName, query, set, (err, reply)=>{
                if(err || reply.n == 0){
                    res.json({"result":0})
                }else{
                    res.json({"result":1})
                }
            })
        })
    });

};
//假条处理的通知
exports.informAsk = (req, res, next)=>{
    const {openId} = req.body;
    const query = {
        openId: openId
    };
    const assign = {
        ask:1
    };
    const getAsk = new Promise((resolve, reject)=>{
        db.getSomething(collectionName,query, assign, (res)=>{
            resolve(res);
        });
    });
    getAsk.then((result)=>{
        if(Array.isArray(result.ask)){
            res.json({tip:result.ask.length});
        }else{
            res.json({tip:0});
        }
    });
};
//显示请假条
exports.askList = (req, res, next) => {
    const {openId} = req.body;
    const query = {
        openId:openId
    };
    const assign = {
        ask:1
    };
    db.getSomething(collectionName,query, assign, (result)=>{
        if(result) {
           res.json(result);
        }else{
           res.json({ask:null})
        }
    });

};
exports.displayAsk = (req, res, next) => {
    const {imagePath} = req.body;
    res.sendFile(imagePath, (err)=>{
        if (err) {
            res.status(err.status).end();
        }
    })
};
//批复假条
exports.handleAsk = (req, res, next)=> {

};
//displayAsk({body:{course:"毛概",account:"20144138075",checkStatus:"02", id:"123654895242x"}});