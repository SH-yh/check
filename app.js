App({
  onLaunch() {
      //要获取用户的openId,去服务器验证用户是否已经绑定
      const self = this;
      const conf = {
          url : 'https//www.check.qianyanxu.com/check/identity'
      }
      fetchIdentity(conf, (mark)=>{
        self.boundMark = mark;
        if(mark == 1){ //老师
            wx.redirectTo({
                url: '/pages/index/index?boundMark=1',
            })
        }else if(mark == -1){//学生
            wx.redirectTo({
                url: '/pages/index/index?boundMark=-1',
            })
        } else if (mark == 0){
            wx.redirectTo({
                url: '/pages/bound/bound',
            })
        }
      });
      function fetchIdentity(conf, callback) {
          const data = '0';//1为老师 -1 为学生 0 是没有绑定
          if (callback) {
              callback(data);
          }
            /*
            wx.request({
                url: ,
            })
            */
      }
  },
  boundMark: ""
})