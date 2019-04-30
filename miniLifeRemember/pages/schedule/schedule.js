// pages/schedule/schedule.js
import { $wuxDialog, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const buttons = [{

  label: '记录',
  className: 'newSubButoon'
  // icon,
},
{
  // openType: 'share',
  label: '日程',
  className: 'newSubButoon'
  // icon,
},
{
  // openType: 'contact',
  label: '生日',
  className: 'newSubButoon'
  // icon,
},
{
  label: '账目',
  // openType: 'getUserInfo',
  className: 'newSubButoon'
  // icon,
}]
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    buttons,
    current: '1',
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo',
    ],
    scheduleVisible: [],
    scheduleData:[],
    spinning: true
  },
  deleteSchedule(e){
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmDelete(e.currentTarget.dataset.index)
  },
  //删除提示
  confirmDelete(index) {
    let vm = this;
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '删除该日程',
      prefixCls: 'wux-dialog',
      confirmType: 'warn',
      confirmText: '确定',
      content: '你确定要丢弃这条日程吗？',
      onConfirm(e) {
        console.log('已删除')
        wx.request({
          url: app.globalData.url + '/timeManage/' + index, // 仅为示例，并非真实的接口地址
          method: 'DELETE',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = vm.data.scheduleData;
            data = vm.data.scheduleData.filter(function (v) {
              return v.id != index
            })
            let scheduleVisibleArray = [];
            for (let k of data) {
              console.log(k)
              scheduleVisibleArray[k.id] = false
            }
            vm.setData({
              scheduleData: data,
              scheduleVisible: scheduleVisibleArray
              // recordData: data

            })
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
  //改变状态
  changeScheduleStatus(e){
    console.log(e);
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    const id = e.currentTarget.dataset.index;
    let changeStatus ='';
    console.log(id)
    console.log(vm.data.scheduleData)
    // console.log(vm.data.scheduleData[id].status)
    let indexId = 0;
    for(let k = 0;k<vm.data.scheduleData.length;k++){
      if(vm.data.scheduleData[k].id === id){
        indexId = k;
      }
    }
    console.log(indexId)
    if(vm.data.scheduleData[indexId].status === 'undo'){
      changeStatus = 'finish'
    }else{
      changeStatus = 'undo'
    }
    wx.request({
      url: app.globalData.url + '/timeManage/' + id, // 仅为示例，并非真实的接口地址
      data: {
        status: changeStatus
      },
      method: 'PUT',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        vm.data.scheduleData.forEach((v, i) => {
          if (v.id === id) {
            vm.setData({
              [`scheduleData[${i}].status`]: changeStatus
            })
          }
        })
        vm.showToast('success', changeStatus)
      },
      error(err) {
        console.log(err)
      }
    })
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
    // this.triggerEvent('changeBar', e)
  },
  showToast(type, text) {
    let vm = this;
    $wuxToast().show({
      type: type,
      duration: 1500,
      color: '#fff',
      text: text,
      success: () => console.log(vm.data.scheduleData)
    })
  },
  onFabButtonChange(){
    this.hideAllPopover()
  },
  selectSchedule(e){
    // console.log(event.currentTarget.dataset.index)
    // this.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    this.hideAllPopover()
    wx.navigateTo({
      url: '/pages/editSchedule/editSchedule?scheduleId=' + e.currentTarget.dataset.index
    })
  },
  longSelectSchedule(e){
    console.log(e)
    console.log(this.data.scheduleVisible)
    this.hideAllPopover();
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  hide(e) {
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  onPopoverChange(e) {
    console.log('onChange', e)
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  hideAllPopover(e){
    console.log(e)
    let scheduleVisibleArray = [];
    this.data.scheduleVisible.forEach((v,index)=>{
      scheduleVisibleArray[index] = false;
    })
    this.setData({
      // [`searchData[${i}].status`]
      scheduleVisible: scheduleVisibleArray,
    })
  },
  //新建按钮点击
  onNewClick(e) {
    console.log(e)
    let vm = this;
    switch (e.detail.index) {
      case 0:
        wx.navigateTo({
          url: '/pages/newRecord/newRecord'
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/newSchedule/newSchedule'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/newBirthday/newBirthday'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/newMoneyAccount/newMoneyAccount'
        })
        break;
      default:
        break;
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const vm = this;
    wx.setNavigationBarTitle({
      title: '徒步浪的随记'
    })
    vm.setData({
      spinning: true
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url + '/getTimeManage/' + wx.getStorageSync('userId'),
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data[0].id)
          let scheduleVisibleArray = [];
          for(let k of res.data){
            console.log(k)
            scheduleVisibleArray[k.id] = false
          }
          vm.setData({
            scheduleData: res.data,
            // searchData: res.data
            scheduleVisible: scheduleVisibleArray,
            spinning: false
          })
          console.log(scheduleVisibleArray)
        },
        error(err) {
          vm.setData({
            spinning: false
          })
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