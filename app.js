App({
  onLaunch() {
      //要获取用户的openId,去服务器验证用户是否已经绑定
    const self = this;
    const conf = {
        url : 'https//www.check.qianyanxu.com/check/identity'
    }
    fetchIdentity(conf, (data)=>{
        if (!data.boundType){
            wx.redirectTo({
                url: '/pages/common/bound/bound',
            })
        }else{
            self.boundType = data.boundType;
        }
    });
    function fetchIdentity(conf, callback) {
        const data = {
            boundMark:0,
            boundType:''
        };//1为老师 -1 为学生 0 是没有绑定
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
  boundType: "",
  openId: ""
})