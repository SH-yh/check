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
        room.member.push(usrId);
    }
};
teacherList.checkExist = (name, usrId)=>{
    const room = teacherList[name];
    if(room.member.indexOf(usrId) == -1) {
       return false;
    }else{
        return true;
    }
};
teacherList.deleteRoom = (roomPath)=>{
    (roomPath in teacherList) && delete teacherList[roomPath];
};
module.exports = teacherList;