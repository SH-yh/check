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
            '<option value="周一">周一</option>'+
            '<option value="周二">周二</option>'+
            '<option value="周三">周三</option>'+
            '<option value="周四">周四</option>'+
            '<option value="周五">周五</option>'+
            '<option value="周六">周六</option>'+
            '<option value="周七">周七</option>'+
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
                        course.push(courseTable);
                    }
                }
            });
            //一个课程遍历完毕
            courseList.push(list);
            j = 0;
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
            var personInput = $(item).find('input');
            personInput.map(function(index, target){
                var input = $(target);
                var key = input.attr('name');
                var value = input.val();
                usr[key] = value;
            });
            usr.course = course;
            usr.courseList = courseList;
            usr.openId = "";
            usr.boundMark="";
            usr.boundType="";
            usr.password="000000";
            usr.check = [];
            usr.ask = [];
            member.push(usr);
        });
        //将数据传送给服务器
        var data = {
            'member':member
        };

        $.ajax({
            "url":"https://127.0.0.1:3030/admin",
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

    addItem();
    commit();
});