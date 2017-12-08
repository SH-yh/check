Page({
  recordChangeCase:[],
  data: {
      scrollHeight:'400',
      recordCase:null,
      status:['已到', '缺勤', '请假']
  },
  onLoad: function (options) {
      const { classId, lessonId,id}= options;
      //0:缺勤 1：已到 2:请假
      const data = [
          {
              "name": '小明',
              "studentId": '20141475035',
              "status": 0,
          },
          {
              "name": '小樱',
              "studentId": '20141475125',
              "status": 1,
          },
          {
              "name": '鸣人',
              "studentId": '20141475784',
              "status": 1,
          },
          {
              "name": '小红',
              "studentId": '20141475856',
              "status": 2,
          },
          {
              "name": '阿飞',
              "studentId": '20141475741',
              "status": 0,
          },
          {
              "name": '小李',
              "studentId": '20141475145',
              "status": 1,
          },
          {
              "name": '瓦萨',
              "studentId": '20141475785',
              "status": 2,
          },
          {
              "name": '阿萨',
              "studentId": '20141475963',
              "status": 0,
          },
          {
              "name": '阿飞',
              "studentId": '20141475785',
              "status": 1,
          },
          {
              "name": '违法',
              "studentId": '20141475965',
              "status":0,
          },
          {
              "name": '违法',
              "studentId": '20141475784',
              "status": 1,
          },
          {
              "name": '违法',
              "studentId": '20141475984',
              "status": 1,
          }
      ]
      wx.getSystemInfo({
          success: (res) => {
              this.setData({
                  scrollHeight: res.windowHeight - 140,
                  recordCase: data
              });
          }
      })        
  },
  onReady: function () {
  
  },


  onShow: function () {
  },
  onHide: function () {

  },

  onUnload: function () {
      //在页面离开的时候吧修改后的数据recordChangeCase发送到服务器进行修改
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  bindPickerChange(e){
    const id = e.target.id;
    const data = setStatus(id, this.data.recordCase, this.recordChangeCase);
    this.setData({recordCase:data});
    function setStatus(value, target, arr){
        const newData = target.map((item, index)=>{
            if (item.studentId == value){
                item.status = e.detail.value;
                if (arr.length == 0){
                    arr.push(item);
                }else{
                    arr.forEach((target)=>{
                        if (target.studentId == value) {
                            target.status = e.detail.value;
                        }
                    }); 
                }
            }
            return item;
        });
        return newData;
    }
  }
})