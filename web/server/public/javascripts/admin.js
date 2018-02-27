$(function(){
    var submit = $("#submit");
    var addItemBtn = $('.add-btn');
    var course_table = $('#course_table');
    var addItem = function(){
        addItemBtn = $('.add-btn');
        course_table = $('#course_table');
        addItemBtn.on('click', handleAddItem);
        course_table.on('click', handleCourseTabel)
    };
    var handleAddItem = function(){
        var parent = $(this).parent();
        var _parent = parent.parent();
        var sibling = parent.siblings();
        var html = sibling.prop("outerHTML");
        _parent.append(html);
        addItemBtn.off('click');
        course_table.off('click');
        addItem();
    };
    var handleCourseTabel = function(){
        var courseHtml = '<div class="course-mes">'+
            '<div class="course">'+
            '<label>'+
            '<sapn>课程:</sapn><input type="text" name="course">'+
            '</label>'+
            '<label>'+
            '<sapn>课程号:</sapn><input type="text" name="courseId">'+
            '</label>'+
            '<label>'+
            '<sapn>课序号:</sapn><input type="text" name="lessonId">'+
            '</label>'+
            '<label>'+
            '<sapn>老师:</sapn><input type="text" name="teacher" >'+
            '</label>'+
            '</div>'+
            '<div class="course-list">'+
            '<h2>上课时间<span class="add-btn">+</span></h2>'+
            '<div class="course-time">'+
            '<label>'+
            '<sapn>星期:</sapn>'+
        '<select name="week" id="week">'+
            '<option value="1">周一</option>'+
            '<option value="2">周二</option>'+
            '<option value="3">周三</option>'+
            '<option value="4">周四</option>'+
            '<option value="5">周五</option>'+
            '<option value="6">周六</option>'+
            '<option value="0">周七</option>'+
            '</select>'+
            '</label>'+
            '<label>'+
            '<sapn>时间:</sapn><input type="text" name="time" class="course_time">'+
            '</label>'+
            '<label>'+
            '<sapn>开始节数:</sapn><input type="text" name="start">'+
            '</label>'+
            '<label>'+
            '<sapn>持续节数:</sapn><input type="text" name="gap" class="course_gap">'+
            '</label>'+
            '<label>'+
            '<sapn>地点:</sapn><input type="text" name="site" id="course_site">'+
            '</label>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('#course_list').append(courseHtml);
        addItemBtn.off('click');
        course_table.off('click');
        addItem();
    };
    var commit = function(){
        submit.on('click', handleCommit);
    };
    var handleCommit = function(){
        var member = [];
        var usr = {};
        var selectionWeek = $('select');
        var courseMessage = $('.course-mes');
        var courseList = [];
        var course = [];
        var j = 0;
        //开始组装课程信息
        courseMessage.map(function(index, item){
            var courseInput = $(item).find('input');
            var list = {},
                courseTable = null;
            //开始遍历一个课程
            courseInput.map(function(index, item){
                var key = $(item).attr('name');
                var value = $(item).val();
                if(index < 4){ //课程号相关信息
                    list[key] = value;
                }else if(index >= 4){
                    var i = index % 4;
                    if(i == 0){//获取上课的星期
                        courseTable = copy(list);
                        courseTable.week = selectionWeek.eq(j++).val();
                    }
                    courseTable[key] = value;
                    if(i == 3){
                        var start = Number(courseTable.start);
                        var gap = Number(courseTable.gap);
                        var index = start + "-" + (gap+start-1);
                        courseTable.index = index;
                        course.push(courseTable);
                    }
                }
            });
            //一个课程遍历完毕
            courseList.push(list);
        });
        //遍历完毕拿到课程表和课程相关的所有信息

        //开始组装用户年级信息
        var classInput = $('.class').eq(0).find('input');
        classInput.map(function(index, item){
            var input = $(item);
            var key = input.attr('name');
            var value = input.val();
            usr[key] = value;
        });
        //开始组装个人信息
        var person = $('.person');
        person.map(function(index, item){
            usr = {};
            usr.openId = "";
            usr.boundMark="";
            usr.boundType="";
            usr.password="000000";
            usr.courseList = courseList;
            usr.course = course;
            usr.check = [];
            usr.ask = [];
            var personInput = $(item).find('input');
            personInput.map(function(index, target){
                var input = $(target);
                var key = input.attr('name');
                var value = input.val();
                usr[key] = value;
                if(key == "account"&&usr[key].length == 5){
                    courseList.map(function(item, index){
                        usr.check.push({
                            "course" : item.course,
                            "courseId" : item.courseId,
                            "lessonId" : item.lessonId,
                            "checkList" : []
                        });
                    });
                }else if((key == "account"&&usr[key].length == 11)) {
                    courseList.map(function(item, index){
                        usr.check.push({
                            "course" : item.course,
                            "teacher" : item.teacher,
                            "askSum" : 0,
                            "checkSum" : 0,
                            "unCheckedSum" : 0,
                            "checkStatus" : []
                        });
                    });
                }
            });
            member.push(usr);
        });
        //将数据传送给服务器
        var data = {
            'member':member
        };
        $.ajax({
            "url":"https://check.qianyanxu.com/admin",
            "method":"POST",
            "contentType": "application/json; charset=utf-8",
            "data":JSON.stringify({ "member":member}),
            "success": function(data){
                data.ok ? alert("置入成功") : alert("置入失败");
            }
        });

    };
    function copy(target){
        var obj = {};
        for(var key in target){
            obj[key] = target[key];
        }
        return obj;
    }
    function getFile(){
        var fileBtn = $("#file");
        fileBtn.on('change', handleFile)
    }
    $('#excel-file').change(function(e) {
        var files = e.target.files;

        var fileReader = new FileReader();
        fileReader.onload = function(ev) {
            try {
                var data = ev.target.result,
                    workbook = XLSX.read(data, {
                        type: 'binary'
                    }), // 以二进制流方式读取得到整份excel表格对象
                    persons = []; // 存储获取到的数据
            } catch (e) {
                console.log(ev);
                alert('文件类型不正确');
                return;
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    //发现json格式不是你想要的你可以
//XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{raw:true, header:1})
                    // 如果只取第一张表，就取消注释这行
                    $("#hiddata").val(JSON.stringify(persons));
                    break; // 如果只取第一张表，就取消注释这行
                }
            }


        };

        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);

    })
    function handleFile(e){
        var files = e.target.files;

        var fileReader = new FileReader();
        fileReader.onload = function(ev) {
            try {
                var data = ev.target.result,
                    workbook = XLSX.read(data, {
                        type: 'binary'
                    }), // 以二进制流方式读取得到整份excel表格对象
                    persons = []; // 存储获取到的数据
            } catch (e) {
                alert('文件类型不正确');
                return;
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    //发现json格式不是你想要的你可以
//XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{raw:true, header:1})
                    // 如果只取第一张表，就取消注释这行
                    $("#hiddata").val(JSON.stringify(persons));
                    break; // 如果只取第一张表，就取消注释这行
                }
            }


        };

        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
        /*
        var file = new FormData();
        file.append('fileData', this.files[0]);
        $.ajax({
            url:"https://127.0.0.1:8080/admin/excel",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data:file,
            datatype:'JSON',
            fileElementId: 'file',
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            cache: false,
            traditional: true,
        })
            */
    }
    getFile();
    addItem();
    commit();
});