"use strict";
const db = require('../model/db');
const collectionName = "teacher";
const tool = require('../third/tool');
const path = require('path');
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
                    "checkStatus.id":Number(id)
                }
            }
        };
        console.log(query);
        const assign = {
            "check.checkStatus":1,
            "check.course":1
        };
        db.getSomething(queryCollectionName, query, assign, (result)=>{
            console.log(result);
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
    const basePath = '/upload/ask/';
    const imgPath = req.params.imgPath;
    const contentPath = path.dirname(__dirname)+basePath+imgPath;
    res.sendFile(contentPath, (err)=>{
        if (err) {
            res.json({
                res:0
            });
        }
    })
};
//批复假条
exports.handleAsk   = (req, res, next)=> {
    const {askChange, openId} = req.body;
    askChange.map((changeItem)=>{
        const {id, account, checkStatus, course, index, date} = changeItem;
        //先从老师ask列表中清除该请假记录，然后找到请假的该学生，去更新该次考勤的状态并清空该学生的ask请假列表，
        const teacherQuery = {
            "openId":openId,
            "ask":{
                "$elemMatch":{
                    "id":id,
                    "account":account
                }
            }
        };
        const set = {
            "$pull":{
                "ask":{
                    "id":id,
                    "account":account
                }
            }
        };
        const studentQuery = {
            "account":account
        };
        const queryCollectionName = "student";
        //第一步更新老师

        db.updateSomething(collectionName, teacherQuery, set, (err,result)=>{
            if(err || result.n != 1){
                res.json({ok: 0});
            }else{
                //从学生的请假列表将该请假记录删除
                db.updateSomething(queryCollectionName, studentQuery, set, (err, sResult)=>{
                    if(err || sResult.n != 1) {
                        res.json({ok: 0});
                    }else{
                        //修改该学生的此次考勤记录的状态
                        const query = {
                            account:account,
                            check:{
                                "$elemMatch":{
                                    "course":course,
                                    "checkStatus.date":date,
                                    "checkStatus.time":index
                                }
                            }
                        };
                        const assign = {
                            "check.checkStatus":1,
                            "check.course":1
                        };
                        db.getSomething(queryCollectionName, query, assign, (checkRecord)=>{
                            if(checkRecord){
                                const newCheckStatus = tool.setCheckStatus(checkRecord.check, course, checkStatus, date, index);
                                const status = newCheckStatus[0].checkStatus;
                                const set = {
                                    "$set":{
                                        "check.$.checkStatus":status
                                    }
                                };
                                db.updateSomething(queryCollectionName, query, set, (err, reply)=>{
                                    if(err || reply.n == 0){
                                        res.json({"ok":0})
                                    }else{
                                        res.json({"ok":1})
                                    }
                                })
                            }else{
                                res.json({"ok":0});
                            }
                        })
                    }
                })
            }
        })

    });
};

/*handleAsk({body:{
    askChange:[
        {
            "account" : "20144138050",
            "date":"2017年12月11日",
            "openId":"123",
            "checkStatus":5,
            "id":"a",
            "course":"数据结构",
            "index":"10:10-11:50"
        }
    ]
}});
*/