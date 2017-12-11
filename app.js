const tool = require('/res/third/tool.js');
App({
  onLaunch() {
      var self = this;
      //要获取用户的openId,去服务器验证用户是否已经绑定
      if(wx.getStorageSync('boundMark')){
          self.boundMark = wx.getStorageSync('boundMark');
          self.boundType = wx.getStorageSync('boundType');
          self.userInfo = wx.getStorageSync('userInfo');
      }
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
  openId: ""
})