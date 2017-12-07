exports.getStudentLoaction = (callback)=>{
    wx.getSystemInfo({
        success: (res) => {
            const windowHeight = res.windowHeight;
            const windowWidth = res.windowWidth;
            wx.getLocation({
                type: 'gcj02',
                success: (data) => {
                    const conf = {
                        mapHeight: windowHeight,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        accuracy: data.accuracy,
                        controls: [
                            {
                                id: 1,
                                iconPath: '/res/images/check/check.png',
                                position: {
                                    left: windowWidth / 2 - 32,
                                    top: windowHeight - 100,
                                    width: 64,
                                    height: 64
                                },
                                clickable: true
                            }
                        ]
                    };
                    if(callback){
                        callback(conf);
                    }
                }
            });
        }
    })
}
exports.handleCheck = ()=> {
    wx.showToast({
        title: '点击控件',
        duration: 2000
    })
}