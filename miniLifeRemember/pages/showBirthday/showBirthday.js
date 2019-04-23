// pages/showBirthday/showBirthday.js
const app = getApp()
import { $wuxDialog, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthdayData:'',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  editBir(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/editBirthday/editbirthday?id='+this.data.id,
    })
  },
  showToast(type, text) {
    $wuxToast().show({
      type: type,
      duration: 1000,
      color: '#fff',
      text: text,
      success: () => wx.navigateTo({
        url: '/pages/calendarTab/calendarTab',
      })
    })
  },
  deleteBir(e){
    const vm =this;
    vm.confirmDelete(vm.data.id);
  },
  //删除提示
  confirmDelete(index) {
    let vm = this;
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '删除该生日',
      prefixCls: 'wux-dialog',
      confirmType: 'warn',
      confirmText: '确定',
      content: '你确定要丢弃这条生日信息吗？',
      onConfirm(e) {
        console.log('已删除')
        wx.request({
          url: app.globalData.url + '/birthday/' + index, // 仅为示例，并非真实的接口地址
          method: 'DELETE',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            
            vm.showToast('success', '已删除')
          },
          error(err) {
            console.log(err)
          }
        })
      },
      onCancel(e) {
        console.log('已取消')
      },
    })
  },
  onLoad: function (options) {
    console.log(options)
    const vm = this;
    wx.setNavigationBarTitle({
      title: '生日信息'
    })
    vm.setData({
      id: options.id
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url+'/birthday/'+options.id,
        success(res){
          console.log(res)
          vm.setData({
            birthdayData:res.data
          })
        },
        error(err){
          console.log(err)
        }
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