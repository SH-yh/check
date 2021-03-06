﻿'use strict';
const db = require('../model/db');
const request = require('request');
const tool = require("../third/tool");
const fs = require('fs');
const fetchOpenId = (JS_code, cb) =>{
    const APP_id = 'wxf9ad2b658a3cc649';
    const SECRET = '4a951f7970b1d89dd9f7b02147d26ead';
    const hostname=`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_id}&secret=${SECRET}&js_code=${JS_code}&grant_type=authoriz`;
    request(hostname, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            const jsBody = JSON.parse(body);
            typeof cb == 'function' && cb(jsBody);
        }
    })

};
exports.isBound = (req, response, next) => {
    const JS_code = req.body.code;
    fetchOpenId(JS_code, (wxInfo)=>{
        const openId =  wxInfo.openid;
        const query = {
            openId:openId
        };
        db.getBoundMark("teacher", query, (result) => {
            if(result){//在老师处发现绑定信息
                response.json({"openId":openId, "boundMark":1, "boundType":1})
            }else{//在学生处发现绑定信息
                db.getBoundMark("student", query, (res) => {
                    if(res){
                        response.json({"openId":openId, "boundMark":1, "boundType":-1})
                    }else{//都没发现，就是该用户未绑定
                        response.json({"openId":openId, "boundMark":0, "boundType":""});
                    }
                });
            }
        })
    });
};
//微信用户与一卡通账户绑定
exports.bound = (req, res, next) => {
    //拿到用户的openId, 账号，密码和用户类型
    const {openId, account, password, type} = req.body;
    //根据用户类别
    const collection = type == 1 ? 'teacher' :'student';
    //构建查询语句
    const query = {
        "account":account,
        "password":password
    };
    //构建设置值
    const set = {
        "openId":openId,
        "boundMark":"1",
        "boundType":type
    };
    //进行更新检查
    db.bound(collection,query,set,(result)=>{
        (result.ok && result.n == 1) ? res.json({"boundMark":1,"boundType":type,"ok":1}) : res.json({"ok":0});
        res.end();
    } );
};
//获取用户当前时间后的两节课程
exports.course = (req, res, next) => {
    const {openId,type, mark} = req.body;
    const date = new Date();
    let week = date.getDay().toString();
    const query = {//组装查询条件
        "openId":openId,
        "course.week":week
    };
    const assign = {//组装指定返回键
        fields:{
            "course":1
        }
    };
    //如果用户类型为1那么查询的集合为teacher,否则为student;
    const collectionName = type == 1 ?　"teacher" : "student";
    db.getSomething(collectionName, query, assign, (data)=>{
        if(!data){//如果今天没有课
            const tip = [{
                "tip":"休息时间",
                "wish":"主人您没课了，请尽情吩咐！",
                "ok":0
            }];
            res.json({course:tip});
        }else{//今天有课
            //获取当天的课程，并将其按时间顺序排列好
            const todayCourse = tool.getTodayCourse(week, data.course);
            if(mark){//如果是mark为true，就把今天的课表发回去
                res.json({course:todayCourse});
            }else {
                //获取当前时间最接近的两节课
                const closeTwoCourse = tool.getCloseTwoCourse(todayCourse);
                res.json({course:closeTwoCourse});
            }
        }
        res.end();
    });
};
exports.courseTable = (req, res, next) => {
    const {openId,type} = req.body;
    const query = {//组装查询条件
        "openId":openId
    };
    const assign = {//组装指定返回键
        fields:{
            "course":1
        }
    };
    //如果用户类型为1那么查询的集合为teacher,否则为student;
    const collectionName = type == 1 ?　"teacher" : "student";
    db.getSomething(collectionName, query, assign, (data)=>{
        const tidyCourse = data && tool.tidyCourse(data.course);
        tidyCourse && res.json({"course":tidyCourse});
    })
};

//测试
// courseTable({body:{"openId":"12345",type:1}});