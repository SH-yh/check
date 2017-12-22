const express = require("express");
const adminControl = require("../controller/adminControl");
const router = express.Router();
router.get("/", (req, res, next)=>{
    adminControl.renderAdmin(req, res, next);
});

router.post("/", (req, res, next)=>{
    adminControl.manageUsers(req, res, next);
});
module.exports = router;