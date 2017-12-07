// pages/index/person.js
Page({
  data: {
    mapHeight:'100px',
    longitude: '',//经度
    latitude:'',//维度,
    accuracy:"",
    controls:[
    ]
  },
  onLoad: function (options) {
    const self = this;
    wx.getSystemInfo({
        success:(res)=>{
            const windowHeight = res.windowHeight;
            const windowWidth = res.windowWidth;
            wx.getLocation({
                type: 'gcj02',
                success:(data)=>{
                    self.setData({ 
                        mapHeight: windowHeight,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        accuracy: data.accuracy,
                        controls: [
                            {
                                id:1,
                                iconPath:'/res/images/check/check.png',
                                position:{
                                    left: windowWidth/2 - 32,
                                    top: windowHeight - 140,
                                    width: 64,
                                    height: 64
                                },
                                clickable: true
                            }
                        ]
                    });  
                }
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
  
  },
  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  handleCheck(){
     wx.showToast({
         title: '点击控件',
         duration:2000
     })
  }
})