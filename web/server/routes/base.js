const express = require('express');
const router = express.Router();
const baseControl = require('../controller/baseControl');

router.post('/isbound', (req, res, next)=>{
    baseControl.isBound(req, res, next);
});
router.post('/bound', (req, res, next)=>{
    baseControl.bound(req, res, next);
});
router.post('/course', (req, res, next)=>{
    baseControl.course(req, res, next);
});
router.post('/course/table', (req, res, next)=>{
    baseControl.courseTable(req, res, next);
});

module.exports = router;