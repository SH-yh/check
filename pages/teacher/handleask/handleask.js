Page({
  askChange:[],  
  data: {
      askList:null,
      handleType:['批准', '驳回']
  },
  onLoad: function (options) {
      this.askChange=[];
      const asklist = [
          {
              name:"张华",
              id:"001",
              data:'2017年10月21日'
          },
          {
              name: "赵丽",
              id: "002",
              data: '2017年10月21日'
          },
          {
              name: "郭刚",
              id: "003",
              data: '2017年10月21日'
          }
      ]
      this.setData({askList:asklist});
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  handleAsk(e){//处理结果 0 ： 批准 后台把该学生此次考勤的状态改为假，1 ： 改为缺勤
    const handleType = e.detail.value;
    const id = e.target.dataset.id;
    const askList = this.data.askList;
    let newList = [];
    askList.map((item)=>{
        if (item.id == id){
            item.handleType = handleType ;
            this.askChange.push(item);
            return;
        }
        newList.push(item);
    });
    this.setData({ askList: newList});
  },
  handleLook(){

  }
})