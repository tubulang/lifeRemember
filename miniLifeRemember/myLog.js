//获取数据
wx.request({
  url: app.globalData.url + '/record', // 仅为示例，并非真实的接口地址
  // data: {
  //   x: '',
  //   y: ''
  // },
  method: 'GET',
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data[0])
  },
  error(err) {
    console.log(err)
  }
})
//提交数据
wx.request({
  url: app.globalData.url + '/record', // 仅为示例，并非真实的接口地址
  data: {
    labelId: '2',
    creator: '1',
    recordContent: '提交毕业设计',
    remindTime: '2019/04/18 00:00:00',
    degreeId: '3',
    status: 'undo'
  },
  method: 'POST',
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
  },
  error(err) {
    console.log(err)
  }
})
//更新数据
wx.request({
  url: app.globalData.url + '/record/' + '2', // 仅为示例，并非真实的接口地址
  data: {
    // labelId: '2',
    // creator: '1',
    // recordContent: '提交毕业设计',
    // remindTime: '2019/04/18 00:00:00',
    // degreeId: '3',
    status: 'undo'
  },
  method: 'PUT',
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
  },
  error(err) {
    console.log(err)
  }
})
//删除数据
wx.request({
  url: app.globalData.url + '/record/' + '5', // 仅为示例，并非真实的接口地址
  // data: {
  //   // labelId: '2',
  //   // creator: '1',
  //   // recordContent: '提交毕业设计',
  //   // remindTime: '2019/04/18 00:00:00',
  //   // degreeId: '3',
  //   status: 'undo'
  // },
  method: 'DELETE',
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
  },
  error(err) {
    console.log(err)
  }
})

let loginFlag = wx.getStorageSync('skey');
if (loginFlag) {
  // 检查 session_key 是否过期
  wx.checkSession({
    // session_key 有效(未过期)
    success: function () {
      // 业务逻辑处理
    },

    // session_key 过期
    fail: function () {
      // session_key过期，重新登录
      doLogin();
    }
  });
} else {
    // 无skey，作为首次登录
    doLogin();
  }
