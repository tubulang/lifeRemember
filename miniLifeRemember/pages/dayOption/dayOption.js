// pages/dayOption/dayOption.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    month:'',
    day:'',

    current: 1,

    tabs: [
      {
        key: 'birth',
        title: '生日',
        // content: 'Content of tab 1',
      },
      {
        key: 'schedule',
        title: '日程',
        // content: 'Content of tab 2',
      },
      {
        key: 'log',
        title: '记录',
        // content: 'Content of tab 3',
      },
      {
        key: 'account',
        title: '账目',
        // content: 'Content of tab 3',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.key = Math.floor(Math.random() * 3)
    // console.log(options.date.day)
    try {

      // 同步接口立即返回值

      var date = JSON.parse(wx.getStorageSync('selectedDay'))
      console.log(date.day)
      this.setData({
        year:date.year,
        month: date.month,
        day: date.day
      })

    } catch (e) {

      console.log('读取key2发生错误')

    }

  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  onChange(e) {
    console.log(e)

    if (e.detail.key === this.key) {
      return wx.showModal({
        title: 'No switching is allowed',
        showCancel: !1,
      })
    }

    this.setData({
      current: e.detail.key,
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