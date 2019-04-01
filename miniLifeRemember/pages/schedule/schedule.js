// pages/schedule/schedule.js
const buttons = [{

  label: '记录',
  className: 'newSubButoon'
  // icon,
},
{
  openType: 'share',
  label: '日程',
  className: 'newSubButoon'
  // icon,
},
{
  openType: 'contact',
  label: '生日',
  className: 'newSubButoon'
  // icon,
},
{
  label: '账目',
  openType: 'getUserInfo',
  className: 'newSubButoon'
  // icon,
},
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    buttons,
    current: '1',
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo',
    ]
  },
  onChangeTab(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
    console.log(e.detail.key)
    wx.redirectTo({
      url: this.data.pagesOption[e.detail.key]
    })
    this.triggerEvent('changeBar', e)
  },
  selectSchedule:function(event){
    console.log(event.currentTarget.dataset.content)
  },
  longSelectSchedule(e){
    console.log(e)
  },
  hide() {
    this.setData({
      visible: false,
    })
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      visible: e.detail.visible,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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