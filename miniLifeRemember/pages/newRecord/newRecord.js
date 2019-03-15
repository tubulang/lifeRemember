// pages/newRecord/newRecord.js
import {
  $wuxSelect
} from '../../miniprogram_npm/wux-weapp/index'
import {
  $wuxCalendar
} from '../../miniprogram_npm/wux-weapp/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    title1: '',
    value2: '',
    title2: '',
    priorityValue: '',
    havePlanTime: false,
    planTime: [],
    remindTime: '',
    openSchedule: false,
    myTypeValue: '',
    myType: '',
    isLoading: false,
    options: [{
        title: '画画',
        value: '1',
      },
      {
        title: '打球',
        value: '2',
      },
      {
        title: '唱歌',
        value: '3',
      },
      {
        title: '游泳',
        value: '4',
      },
      {
        title: '健身',
        value: '5',
      },
      {
        title: '睡觉',
        value: '6',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //保存记录
  submitRecord(e){
    this.setData({
      isLoading: true
    })
    console.log(e)
  },
  //选择提醒时间
  bindRemindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      remindTime: e.detail.value
    })
  },

  //选择计划时间
  showPlanTime() {
    const now = new Date()
    const minDate = now.getTime()
    $wuxCalendar().open({
      value: this.data.planTime,
      minDate,
      direction: 'vertical',
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          planTime: displayValues,
        })
      },
    })
  },
  //开启添加日程
  openSchedule() {
    this.setData({
      openSchedule: !this.data.openSchedule,
      havePlanTime: !this.data.havePlanTime
    })
  },
  //选择优先级
  setPriority(e) {
    this.setData({
      priorityValue: e.detail.value
    })
    console.log('priority', this.data.priorityValue)
  },
  //选择标签
  showTags() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#wux-select3').open({
      value: this.data.myTypeValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },
      options: this.data.options,
      // onChange: (value, index, options) => {
      //   console.log('onChange', value, index, options)
      //   this.setData({
      //     myTypeValue: value,
      //     // title3: index.map((n) => options[n].title),
      //     myType: options[index].title,
      //   })
      // },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', index)
        if (index !== -1) {
          this.setData({
            myTypeValue: value,
            // title3: index.map((n) => options[n].title),
            myType: options[index].title,
          })
        }

      },
      // onCancel: (value, index, options)=>{
      //   console.log('onConfirm', value, index, options)
      //   this.setData({
      //     myTypeValue: value,
      //     // title3: index.map((n) => options[n].title),
      //     myType: options[index].title,
      //   })
      // }
    })
  },

  //选择类别
  showTypes() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#wux-select3').open({
      value: this.data.myTypeValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },
      options: this.data.options,
      // onChange: (value, index, options) => {
      //   console.log('onChange', value, index, options)
      //   this.setData({
      //     myTypeValue: value,
      //     // title3: index.map((n) => options[n].title),
      //     myType: options[index].title,
      //   })
      // },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', index)
        if (index !== -1) {
          this.setData({
            myTypeValue: value,
            // title3: index.map((n) => options[n].title),
            myType: options[index].title,
          })
        }

      },
      // onCancel: (value, index, options)=>{
      //   console.log('onConfirm', value, index, options)
      //   this.setData({
      //     myTypeValue: value,
      //     // title3: index.map((n) => options[n].title),
      //     myType: options[index].title,
      //   })
      // }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})