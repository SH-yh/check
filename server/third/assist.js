"use strict";
exports.fillCourse = (data) => {
    for(let key in data){
        const target = data[key];
        if (target[0].start > 1) {//如果不是一天的第一节课,对其前的时间进行填充
            for (let i = 0; i < target.length;i++){
                fill(target);
            }
        }//对其后的课程时间进行填充
        for (let i = 0; i < target.length; i++) {
            const item = target[i];
            let obj = findStart(target);
            const index = (Number(item.start) + Number(item.gap)) + "";
            if (obj.indexOf(index) == -1 && index < 12) {
                target.splice(i + 1, 0, {
                    "start": index,
                    "gap": 1,
                })
            }
        }
    }
    courseColor(data);
};
const courseColor = (arg) => {
    for (let key in arg) {
        const target = arg[key];
        const length = target.length;
        for (let i = 0; i < length; i++) {
            const item = target[i];
            if (item.gap != 1) {
                item.color = randomColor();
            }
        }
    }
};
const findStart = (arg) => {
    let obj = [];
    for (let i = 0; i < arg.length; i++) {
        obj.push(arg[i].start);
    }
    return obj;
};
const fill = (arg) => {
    for (let i = arg[0].start; i > 1; i--) {
        arg.unshift({
            "start": i - 1,
            "gap": 1
        });
    }
};
const randomColor = () => {
    const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let color = "";
    for (let i = 0; i < 6; i++) {
        let n = Math.floor(Math.random() * (colors.length));
        color += colors[n];
    }
    if (color == "ffffff"){
        color == 'B5627E';
    }
    const randomColor = "#" + color;
    return randomColor;
};
exports.convertDate = (data) => {
    switch (data) {
        case 0:
            return "日";
            break;
        case 1:
            return "一";
            break;
        case 2:
            return "二";
            break;
        case 3:
            return "三";
            break;
        case 4:
            return "四";
            break;
        case 5:
            return "五";
            break;
        case 6:
            return "六";
            break;
    }
}