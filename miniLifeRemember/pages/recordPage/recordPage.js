// pages/recordPage/recordPage.js

const buttons = [{
  
  label: '记录',
  className:'newSubButoon'
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
import { $wuxDialog } from '../../miniprogram_npm/wux-weapp/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:'post',
    buttons,
    recordData: [],
    che: true,
    value4: ['1'],
    done: true,
    searchValue: '',
    right: [{
      text: '编辑',
      style: 'background-color: #11c1f3; color: white; width: 3.5rem;border: 0px;',
    },
    {
      text: '完成',
      style: 'background-color: #33cd5f; color: white; width: 3.5rem;border: 0px;'
    }],
    left: [{
      text: '删除',
      style: 'background-color: #F4333C; color: white; width: 3.5rem;border: 0px;',
    }],
    // viewData: 'aa'
  },
  onClick(e){
    console.log(e)
    let vm = this;
    if(e.detail.index === 0){
      vm.newRecord();
    }
  },
  //新建记录
  newRecord() {
    wx.navigateTo({
      url: '/pages/newRecord/newRecord'
    })
  },
  //删除提示
  confirmDelete(index) {
    let vm = this;
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '定制冰激凌',
      prefixCls: 'wux-dialog',
      confirmType: 'warn',
      confirmText: '确定',
      content: '你确定要吃我的冰淇淋吗？',
      onConfirm(e) {
        console.log('凭什么吃我的冰淇淋！')
        wx.request({
          url: app.globalData.url + '/record/' + index, // 仅为示例，并非真实的接口地址
          method: 'DELETE',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = vm.data.recordData;
            data = vm.data.recordData.filter(function(v){
              return v.id!=index
            })
            vm.setData({
              recordData: data
            })
          },
          error(err) {
            console.log(err)
          }
        })
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })
  },
  onSelectChange(e){
    console.log(e)
  },
  openRecordBar() {
    // console.log('daf')
    this.triggerEvent('openBar')
  },
  leftOperator(e) {
    console.log(e.currentTarget.dataset)
    this.confirmDelete(e.currentTarget.dataset.selectid);
    console.log('onClick', e.detail, e)
  },
  // selectTap(e) {
  //   console.log('aa')
  //   console.log(e.detail.detail)
  //   console.log(e)
  //   // this.triggerEvent('selectTap', e, { composed: true })
  // },
  // onTap(e){
  //   this.triggerEvent('click', e, {composed:true})
  // },
  rightOperator(e) {
    if (e.detail.index === 0) {
      console.log(e.detail.value)
      return false
    }
    if (e.detail.index === 1) {
      console.log(e.detail.value)
    }
  },
  onClickOperator(e) {

    switch (e.detail.type) {
      case 'left': this.leftOperator(e)
        break;
      case 'right': this.rightOperator(e)
        break;
      default:
        break;
    }

  },
  onShare() {
    console.log('onShare')
  },

  //checkbox
  onChange(field, e) {
    const { value } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    this.setData({
      [field]: current,
    })

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  onChange1(e) {
    this.onChange('value1', e)
  },
  selectOperator:function(e){
    console.log(e.detail.detail)
    console.log(e)
  },
  onChangeBar(e){
    console.log(e)
  },
  openRecordBar(e){
    console.log('sdfs')
    
    // this.setData({
    //   [buttons[e.detail.data.index]]:'hideAdd'
    // })
  },
  
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      searchValue: '',
    })
  },
  onCancel(e) {
    let vm = this;
    vm.onClear()
    console.log('onCancel', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const vm = this;
    console.log(wx.getStorageSync('sessionKey'))
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
        console.log(res.data)
        // this.setData({
        //   value: e.detail.value,
        // })
        // for(let i = 0; i< res.data.length; i++){
        //   res.data[i][status] = true
        // }
        vm.setData({
          recordData: res.data
        })
        // for(let i in res.data){
          // vm.setData({
          //   "recordData[1].status":true
          // })
        // }
        // console.log(vm.data.recordData[1].status)
      },
      error(err) {
        console.log(err)
      }
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