const tool = require('../../../res/third/tool.js');
const app = getApp();
Page({
    data: {
        accountValue:"",
        passwordValue:"",
        mark:false
    },

    onLoad: function (options) {
        const conf = {
            url: 'https://check.qianyanxu.com/base/isBound'
        }
        wx.showLoading({
            "title":"加载中...."
        })
        //去确定用户是否绑定
        tool.fetchIdentity(conf, (data) => {
            const { openId, boundMark, boundType } = data;
            app.openId = openId;
            if (boundMark) {//如果已经绑定则转向首页
                app.boundMark = boundMark;
                app.boundType = boundType;
                wx.switchTab({
                    url: '/pages/common/index/index',
                })
            }else{
                wx.hideLoading();
                this.setData({
                    "mark":true
                });
            }
        });
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
    handleAccontInput(e){
        this.setData({
            accountValue:e.detail.value
        });
    },
    handlePasswordInput(e){
        this.setData({
            passwordValue: e.detail.value
        });
    },
    handleConfirm(){
        const accountValue = this.data.accountValue;
        const passwordValue = this.data.passwordValue;
        const length = this.data.accountValue.length;
        if (accountValue == "" || passwordValue==""){
            wx.showToast({
                title: '请填写完整！',
                duration:2000
            })
        }else{
            if(length == 5 || length == 11){
                const data = {
                    "account": accountValue,
                    "password": passwordValue,
                    "type": length == 5 ? 1 : -1,
                    "openId":app.openId
                }
                const conf = {
                    "url":"https://check.qianyanxu.com/base/bound",
                    "method":"POST",
                    "data": data
                }
                //进行绑定
                tool.fetch(conf, (res)=>{
                    if (res.ok) {//如果绑定成功，将boundMark，boundType绑定到全局
                        app.boundMark = res.boundMark;
                        app.boundType = res.boundType;
                        //页面转到首页
                        wx.switchTab({
                            url: '/pages/common/index/index',
                        })
                    }else{
                        wx.showToast({
                            title: '账号密码错误',
                            duration: 2000
                        })
                    }
                })
            }else{
                wx.showToast({
                    title: '账号错误！',
                    duration: 2000
                })
            }
        }
    }
})