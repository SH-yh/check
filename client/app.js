const tool = require('/res/third/tool.js');
App({
  onLaunch() {
      var self = this;
      
      wx.getSystemInfo({
          success: (res) => {
              self.windowHeight = res.windowHeight;
          }
      })
  },
  getUserInfo(cb){
        const self = this;
        if (this.userInfo){
            typeof cb == "function" && cb(this.userInfo);
        }else{
            wx.getSetting({
                success: (res) => {
                    tool.getUserInfo((userInfo) => {
                        self.userInfo = userInfo;
                        typeof cb == 'function' && cb(userInfo);
                    })
                }
            })
        }
  },
  userInfo:"",
  boundMark:"",
  boundType: "",
  openId: "",
  windowHeight: "",
  courseInfo:null,
  checkMark:false
})