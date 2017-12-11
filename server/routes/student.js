const express = require('express');
const router = express.Router();
const studentControl = require('../controller/studentControl');

//学生所有课程总的考勤记录，有single标记
router.post('/course/checkrecord', (req, res, next)=>{
    studentControl.checkrecord(req, res, next);
});
//查询单个课程详细的考勤情况
router.post('/course/singlerecord', (req, res, next)=>{
    studentControl.singleRecord(req, res, next);
});
//学生请假
router.post('', (req, res, next) => {
    studentControl.ask(req, res, next)
});


module.exports = router;
