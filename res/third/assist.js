exports.findStart = (arg) => {
    let obj = [];
    for (let i = 0; i < arg.length; i++) {
        obj.push(arg[i].start);
    }
    return obj;
}
exports.fill = (arg) => {
    const length = arg[0].start;
    for (let i = arg[0].start; i > 1; i--) {
        arg.unshift({
            "start": i - 1,
            "gap": 1
        });
    }
}
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
exports.randomColor = () => {
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
}
