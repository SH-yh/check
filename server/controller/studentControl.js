"use strict";
const  db = require('../model/db');
const tool = require('../third/tool');
const formidable = require('formidable');
const  util = require('util');
const path = require('path');
const fs = require('fs');
const collectionName = "student";
exports.checkRecord = (req, res, next) => {
    const {openId} = req.body;
    const assign = {
        "check.course": 1,
        "check.teacher": 1,
        "check.askSum": 1,
        "check.checkSum": 1,
        "check.unCheckedSum": 1,
    };
    const query = {
        "openId":openId
    };
    db.getSomething(collectionName, query, assign, (result)=>{
        result ? res.json({"record":result}) : res.json({"record":null});
        res.end();
    });
};
exports.singleRecord = (req, res, next)=>{
    const {openId, course} = req.body;
    const assign = {
        "check.course": 1,
        "check.checkStatus": 1
    };
    const query = {
        "openId":openId,
        "check.course":course
    };
    db.getSomething(collectionName, query, assign, (result)=>{
        var data = null;
        if(result){
            //得到符合course条件的考勤记录
            data = tool.getSomeValue('course',course, result.check);
            //得到checkStatus，返回的是一个二维数组
            data = tool.getSomeKey('checkStatus', data)[0];
        }
        res.json({"record":data});
        res.end();
    });
};
exports.ask = (req, res, next)=>{
    const id = +new Date();
    const form = new formidable.IncomingForm();
    const askPromise = new Promise((resolve, reject)=>{
        form.parse(req, (err, fields, files)=>{
            resolve({fields:fields, files:files});
        });
    });
    askPromise.then((value)=>{
        return new Promise((resolve, reject)=>{
            const {fields,files} = value;
            const askPng =files.askPng;
            const extname = path.extname(askPng.name);//获取扩展名
            const oldPath = askPng.path; //获取formidable的存储路径
            //设置新的存储路径
            const newPath = path.resolve(__dirname + "/../upload/ask") + "/" + id + extname;
            //将原有文件改到新的存储文件路径下
            fs.rename(oldPath,newPath,function(err){
                if(err) {
                    res.json({"ok":0});
                    return;
                }else{
                    resolve({fields:fields,imgPath:newPath});
                }
            });
        }).then((value)=>{
            const {fields,imgPath} = value;
            const {openId, course, time, teacherName} = fields;
            const {date} = tool.getDate();
            const studentQuery = {
                "openId":openId,
            };
            const teacherQuery = {
                "name":teacherName,
                "courseList.course":course
            };
            const set = {
                "$push":{
                    ask: {
                        date: date,
                        id: id,
                        course: course,
                        index: time,//请的是第几节课的假,
                        imgPath: imgPath
                    }
                }
            };
           db.updateSomething(collectionName, studentQuery, set, (err, result)=>{
               if(err || result.n){
                   res.json({ok:0});
               }else if(result){
                    db.updateSomething('teacher', teacherQuery, set, (err, result)=>{
                        if(err || result.n){
                            res.json({ok:0});
                        }else{
                            res.json({
                                ok:1
                            });
                        }
                    })
               }
           });
        });
    });
};