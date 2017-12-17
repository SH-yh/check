const express = require('express');
const router = express.Router();
const teacherControl = require('../controller/teacherControl');

//老师所有课程的考勤记录
router.post('/course/record', (req, res, next)=>{
    teacherControl.record(req, res, next);
});
//老师某门课程的考勤记录概况
router.post('/course/recordcase', (req, res, next)=>{
    teacherControl.recordCase(req, res, next);
});
//某班某课程的历史考勤记录
router.post('/course/record/history', (req, res, next) => {
    teacherControl.history(req, res, next);
});
//某班某一课程历史考勤记录学生情况
router.post('/course/record/history/recordcase', (req, res, next) => {
    teacherControl.recordCaseItem(req, res, next);
});
//学生考勤状态修改
router.post('/course/record/checkstatus', (req, res, next) => {
    teacherControl.checkStatus(req, res, next);
});
//假条处理的通知
router.post('/informask', (req, res, next)=>{
    teacherControl.informAsk(req, res, next);
});
//请假清单
router.post('/asklist', (req, res, next)=>{
    teacherControl.askList(req, res, next);
});
//显示请假条
router.post('/displayask', (req, res, next) => {
    teacherControl.displayAsk(req, res, next);
});
//批复假条
router.post('/handleask', (req, res, next) => {
    teacherControl.handleAsk(req, res, next);
});
module.exports = router;
