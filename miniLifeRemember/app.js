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
        let vm =this;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              vm.globalData.userInfo = res.userInfo
              console.log('userInfo', res)
              const { encryptedData, iv } = res
              const name = res.userInfo.nickName;
              fn(encryptedData, iv, name);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (vm.userInfoReadyCallback) {
                vm.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //登陆
  doLogin(successRes,failErr) {
    let vm = this;
      // 登录
      wx.login({
        success: res => {
          console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            let encryptedData = '', iv = '';
            this.doGetUserInfo(function (encryptedData, iv, name){
              vm.globalData.encryptedData = encryptedData;
              vm.globalData.iv = iv;
              wx.request({
                url: vm.globalData.url + '/login', // 仅为示例，并非真实的接口地址
                data: {
                  code: res.code,
                  encryptedData: vm.globalData.encryptedData,
                  iv: vm.globalData.iv,
                  name
                },
                method: 'post',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  if (res.data.status === -2) {
                    console.log(res.data.errmsg)
                  } else {
                    wx.setStorageSync('userId', res.data)
                    successRes(res);//成功回调
                  }
                },
                error(err) {
                  console.log(err)
                  failErr(err); // 失败回调
                }
              })
            });
            
          }
        }
      })
  },
  checkSkey(){
    let vm = this;
    return new Promise(function (resolve, reject) {
      //判断登陆sessionkey是否失效
      let loginFlag = wx.getStorageSync('userId');
      if (loginFlag) {
        // 检查 session_key 是否过期
        wx.checkSession({
          // session_key 有效(未过期)
          success: function (res) {
            console.log(res)
            resolve(res);
            vm.doGetUserInfo(()=>{});
            // 业务逻辑处理
          },
          // session_key 过期
          fail: function () {
            // session_key过期，重新登录
            vm.doLogin(res=>resolve(res),err=>reject(err));
          }
        });
      } else {
        // 无skey，作为首次登录
        vm.doLogin(res => resolve(res), err => reject(err));
      }
    })
  },
  globalData: {
    userInfo: null,
    encryptedData:'',
    iv:'',
    url: 'http://localhost:7001',
    // url: 'https://api.tubulang.cn',
  }
})