const db = require("../model/db");
exports.renderAdmin = (req, res, next)=>{
    res.render("admin");
};
exports.manageUsers = (req, res, next)=>{
    const member = req.body.member;
    const collectionName = member[0].account.length == 5 ? "teacher" :　"student";
    db.insertDocument(collectionName, member, (result)=>{
        if(result.ok && result.n != 0){
            res.json({ok:1});
        }else{
            res.json({ok:0});
        }
    });
};