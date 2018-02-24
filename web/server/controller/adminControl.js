const db = require("../model/db");
const formidable = require('formidable');
const fs= require('fs');
const path = require('path');
exports.renderAdmin = (req, res, next)=>{
    res.render("admin");
};
exports.manageUsers = (req, res, next)=>{
    const member = req.body.member;
    const collectionName = member[0].account.length == 5 ? "teacher" :　"student";
    db.insertDocument(collectionName, member, (result)=>{
        const reply = result.result;
        if(reply.ok && reply.n != 0){
            res.json({ok:1});
        }else{
            res.json({ok:0});
        }
    });
};
exports.handleExcel = (req, res, next)=>{
    const filePath = "C:/Users/HJ/AppData/Local/Temp/upload";
    fs.readFile(filePath,(data)=>{
        console.log(data);
    });
/*
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
       const file = files.fileData;
       const filePath = file.path;
       const newPath = path.resolve(filePath)+ "/../upload/11"  + path.extname(file.name);
       fs.rename(filePath,newPath, (err, data)=>{
           console.log(err, data)
       });
    });
*/
};