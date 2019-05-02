// pages/moneyAccount/moneyAccount.js
const app = getApp();
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
  className: 'newSubButoon',
  spinning: true
  // icon,
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons,
    current: '3',
    visible: [],
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo',
    ],
    showInput: true,
    showOutput: false,
    inputData: [],
    ouputData: [],
  },
  hideAllMoneyPopover(e) {
    console.log(e)
    let visibleArray = [];
    this.data.visible.forEach((v, index) => {
      visibleArray[index] = false;
    })
    this.setData({
      // [`searchData[${i}].status`]
      visible: visibleArray,
    })
  },
  onChangeCard(e){
    // console.log(e.detail.key)
    if(e.detail.key === 0){
      this.setData({
        showInput: true,
        showOutput: false
      })
    }else if(e.detail.key === 1){
      this.setData({
        showInput: false,
        showOutput: true
      })
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    wx.setNavigationBarTitle({
      title: '徒步浪的随记'
    })
    vm.setData({
      spinning: true
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url + '/getMoneyAccount/'+wx.getStorageSync('userId'),
        success(res){
          console.log(res)
          let inputArray = [], outputArray = [];
          let visibleArray = [];
          for (let k of res.data) {
            console.log(k)
            visibleArray[k.id] = false
          }
          if(res.data){
            res.data.forEach(v=>{
            if (v.accountType === 'expend'){
              outputArray.push(v)
            }else{
              inputArray.push(v)
            }
          })
          }
          vm.setData({
            outputData: outputArray,
            inputData: inputArray,
            visible: visibleArray,
            spinning:false
          })
          console.log(outputArray,inputArray)
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
  hide(e) {
    this.setData({
      // [`searchData[${i}].status`]
      [`visible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  selectInput(e){
    this.hideAllMoneyPopover(e)
  },
  longSelectInput(e){
    this.hideAllMoneyPopover(e)
    this.setData({
      // [`searchData[${i}].status`]
      [`visible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  selectOutput(e) {
    this.hideAllMoneyPopover(e)
  },
  longSelectOutput(e) {
    this.hideAllMoneyPopover(e)
    this.setData({
      // [`searchData[${i}].status`]
      [`visible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  onPopoverChange(e) {
    console.log('onChange', e)
    this.setData({
      // [`searchData[${i}].status`]
      [`visible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  deleteInput(e) {
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`visible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmDelete(e.currentTarget.dataset.index,'input')
  },
  editInput(e){
    wx.navigateTo({
      url: '/pages/editInputMoneyAccount/editInputMoneyAccount?moneyId=' + e.currentTarget.dataset.index,
    })
  },
  editOutput(e) {
    wx.navigateTo({
      url: '/pages/editOutputMoneyAccount/editOutputMoneyAccount?moneyId=' + e.currentTarget.dataset.index,
    })
  },
  deleteOutput(e) {
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`visible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmDelete(e.currentTarget.dataset.index,'output')
  },
  //删除提示
  confirmDelete(index,type) {
    let vm = this;
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '删除该账目',
      prefixCls: 'wux-dialog',
      confirmType: 'warn',
      confirmText: '确定',
      content: '你确定要丢弃这条账目信息吗？',
      onConfirm(e) {
        console.log('已删除')
        wx.request({
          url: app.globalData.url + '/moneyAccount/' + index, // 仅为示例，并非真实的接口地址
          method: 'DELETE',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = '';
            
            // data = vm.data.scheduleData.filter(function (v) {
            //   return v.id != index
            // })
            let visibleArray = [];
            for (let k of data) {
              console.log(k)
              visibleArray[k.id] = false
            }
            if (type === 'input') {
              data = vm.data.inputData.filter(function (v) {
                return v.id != index
              })
              vm.setData({
                inputData: data,
                visible: visibleArray
                // recordData: data
              })
            } else {
              data = vm.data.outputData.filter(function (v) {
                return v.id != index
              })
              vm.setData({
                outputData: data,
                visible: visibleArray
                // recordData: data
              })
            }
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
  showToast(type, text) {
    $wuxToast().show({
      type: type,
      duration: 1000,
      color: '#fff',
      text: text,
      success: () => console.log(text)
    })
  },
  onFabButtonChange(){
    this.hideAllMoneyPopover()
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