const tool = require("../../../res/third/tool.js");
const app = getApp();
Page({
    data: {
        courseInfo: {},
        boundMark: "",
        date: tool.getDate(),
    },
    onLoad(options) {
        const self = this;
        //通过openId和boundType想服务器请求对应的课程资源 学生与老师公用一个主页
        //openId = App.openId 
        const conf = {
            url: 'https//www.check.qianyanxu.com/check/identity'
        }
        if (app.userInfo){//如果本地已经保存了用户的信息
            //如果本地已经有了绑定信息，则根据绑定信息获取课程
            tool.fetchCourse((data) => {
                this.setData({
                    courseInfo: data,
                    boundMark: app.boundMark
                });
            });
        }else{
            const promise = new Promise((resolve, reject)=>{
                app.getUserInfo((userinfo)=>{
                    resolve(userinfo);
                })
            });
            promise.then((userinfo)=>{
                return !app.boundMark &&  new Promise((reslove, reject)=>{
                    self.fetchIdentity(conf, (data) => {
                        reslove(data)
                    })
                });
            })
            .then((data)=>{
                if (!data.boundMark) {//如果用户没有绑定，则页面转向绑定页面
                    wx.redirectTo({
                        url: '/pages/common/bound/bound',
                    })
                } else {//用户已经绑定，获取绑定标记，绑定类型
                    const boundMark = data.boundMark;
                    const boundType = data.boundType;
                    //将用户的信息绑定标记和绑定类型保存在本地
                    self.saveStorage({
                        boundMark: boundMark,
                        boundType: boundType,
                        userinfo: userinfo
                    });
                    app.boundMark = boundMark;
                    app.boundType = boundType;
                    return new Promise((resolve, reject)=>{
                        tool.fetchCourse((data) => {
                            resolve({
                                data: data,
                                boundMark: boundMark
                            });
                        });
                    });
                }
            })
            .then((data)=>{
                data && this.setData({
                    courseInfo: data.data,
                    boundMark: data.boundMark
                });
            });
        }
    },
  saveStorage(item){
     for(let key in item){
         wx.setStorageSync(key, item[key]);
     }
  },
  fetchIdentity(conf, callback){
      const data = {
          boundMark: 0,
          boundType: ''
      };//1为老师 -1 为学生 0 是没有绑定
      if (callback) {
          callback(data);
      }
  }
})
