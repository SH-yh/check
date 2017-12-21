let teacherList = {};
teacherList.addRoom =  (name, wsRoom)=>{
    if(!(name in teacherList)){
        teacherList[name] = {
            "owner":wsRoom,
            "checkSum":0,
            "checkStatus":false,
            "member": [],
            "totalMember":null
        }
    }
};
teacherList.setKeyValue = (name, key, value) => {
    teacherList[name][key] = value;
};
teacherList.addMember = (name, usrId)=>{
    const room = teacherList[name];
    if(room.member.indexOf(usrId) == -1) {
        room.checkSum++;
        room.member.push(usrId);
        return true;//返回true，代表用户可以进行签到
    }else{
        return false;//false表示用户已经签过到了。
    }
};
module.exports = teacherList;