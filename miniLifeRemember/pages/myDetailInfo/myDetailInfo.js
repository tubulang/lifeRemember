// pages/myDetailInfo/myDetailInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    spinning:false,
    recordCount:'',
    finishRecordCount:'',
    scheduleCount:'',
    finishScheduleCount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的详情'
    })

    let vm = this;
    // vm.setData({
    //   spinning: true
    // })
    if (app.globalData.userInfo) {
      console.log('qq')
      this.setData({
        userInfo: app.globalData.userInfo,
        // hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log('qqee')

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({

        success: res => {
          console.log('wwqq')

          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    app.checkSkey().then(() => {
      //获取标签000
      const recordPromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getRecordCount/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = [];
            console.log(res.data)
            if (res.statusCode === 200) {
              vm.setData({
                recordCount: res.data
              })
              resolve();
            }
            // console.log(res.data)
          },
          error(err) {
            reject();
            console.log(err)
          }
        })
      })
      //获取分类
      const finishRecordPromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getFinishRecordCount/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = [];
            console.log(res.statusCode)
            if (res.statusCode === 200) {
              
              vm.setData({
                finishRecordCount: res.data
              })
              resolve()
            }
            console.log(res.data)
          },
          error(err) {
            reject()
            console.log(err)
          }
        })
      })
      let getRecordData = []
      //获取record信息
      const schedulePromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getTimeManageCount/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              vm.setData({
                scheduleCount:res.data
              })
              resolve();
            }
            reject()
          },
          error(err) {
            reject()
            console.log(err)
          }
        })
      })

      const finishSchedulePromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getFinishTimeManageCount/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              vm.setData({
                finishScheduleCount:res.data
              })
              resolve();
            }
            reject()
          },
          error(err) {
            reject()
            console.log(err)
          }
        })
      })
      Promise.all([recordPromise, finishRecordPromise, schedulePromise,finishSchedulePromise]).then(() => {
        
        // console.log(getRemindTime)
        vm.setData({
         
          spinning: false
          // classificationValue: getRecordData.class
        })
    
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})