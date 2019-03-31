//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //判断登陆sessionKey
    this.checkSkey();
    
    
  },
  doGetUserInfo(fn){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('userInfo', res)
              const { encryptedData, iv } = res
              console.log('test',encryptedData,'hhhhhhhhhhhhhhhh',iv)
              fn(encryptedData, iv);
              
              // wx.request({
              //   url: this.globalData.url + '/login', // 仅为示例，并非真实的接口地址
              //   data: {
              //     encryptedData,
              //     iv
              //   },
              //   method: 'post',
              //   header: {
              //     'content-type': 'application/json' // 默认值
              //   },
              //   success(res) {
              //     console.log(res.data)
              //     wx.setStorageSync('sessionKey', res.data)

              //   },
              //   error(err) {
              //     console.log(err)
              //   }
              // })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //登陆
  doLogin() {
    let vm = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // example: 081LXytJ1Xq1Y40sg3uJ1FWntJ1LXyth
          let encryptedData = '', iv = '';

          this.doGetUserInfo(function (encryptedData, iv){
            vm.globalData.encryptedData = encryptedData;
            vm.globalData.iv = iv;
            wx.request({
              url: vm.globalData.url + '/login', // 仅为示例，并非真实的接口地址
              data: {
                code: res.code,
                encryptedData: vm.globalData.encryptedData,
                iv: vm.globalData.iv
              },
              method: 'post',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res.data)
                if (res.data.status === -2) {
                  console.log(res.data.errmsg)
                } else {
                  wx.setStorageSync('sessionKey', res.data)
                }


              },
              error(err) {
                console.log(err)
              }
            })
          });
          
        }
      }
    })
  },
  checkSkey(){
    //判断登陆sessionkey是否失效
    let loginFlag = wx.getStorageSync('sessionKey');
    if (!loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function () {
          // 业务逻辑处理
        },

        // session_key 过期
        fail: function () {
          // session_key过期，重新登录
          this.doLogin();
        }
      });
    } else {
      // 无skey，作为首次登录
      this.doLogin();
    }
  },
  globalData: {
    userInfo: null,
    encryptedData:'',
    iv:'',
    url: 'http://localhost:7001',
    // url: 'https://api.tubulang.cn',
    // url:'http://172.16.213.133:7001'
  }
})