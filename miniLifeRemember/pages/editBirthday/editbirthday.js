// pages/newRecord/newRecord.js
import {
  $wuxSelect
} from '../../miniprogram_npm/wux-weapp/index'
import {
  $wuxCalendar
} from '../../miniprogram_npm/wux-weapp/index'
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // priorityValue: '',
    name: '',
    day: [],
    isLoading: false,
    id: '',
    spinning:true,
    isSubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.checkSkey();
    //获取label数据
    // if(wx.getStorageSync('userId')){
    let vm = this;
    wx.setNavigationBarTitle({
      title: '编辑生日'
    })
    console.log(options)
    vm.setData({
      id: options.id,
      spinning:true
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url + '/birthday/'+options.id,
        success(res){
          console.log(res);
          // if(res.data.day)
          vm.setData({
            name: res.data.name,
            'day[0]': res.data.day,
            spinning:false
          })
        },
        error(e){
          vm.setData({
            spinning: false
          })
          console.log(e)
        }
      })
    })
  },
  //保存记录
  submitRecord(e) {
    // this.setData({
    //   isLoading: true
    // })
    console.log(e)
    let vm = this;
    vm.setData({
      isSubmit:true
    })
    wx.request({
      url: app.globalData.url + '/formIdGroup',
      method: 'post',
      data: {
        formId: e.detail.formId,
        creator: wx.getStorageSync('userId'),
      },
      success(res) {
        let sendData = {
          name: vm.data.name,
          day: vm.data.day[0],
          creator: wx.getStorageSync('userId'),
          lunarMark: 0
        }
        if(!sendData.name){
          vm.showToast('forbidden', '请填写姓名', () => { })
        }else{
          wx.request({
            url: app.globalData.url + '/birthday/'+vm.data.id, // 仅为示例，并非真实的接口地址
            data: sendData,
            method: 'PUT',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              vm.showToast('success', '提交成功', () => {
                wx.reLaunch({
                  url: '/pages/calendarTab/calendarTab',
                })
              })

            },
            error(err) {
              console.log(err)
            }
          })
        }
        
      },
      error(err) {
        console.log(err)
      }
    })
    // console.log(sendData)

    console.log(e)
  },
  onChangeName(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  showToast(type, text, fn) {
    $wuxToast().show({
      type: type,
      duration: 1500,
      color: '#fff',
      text: text,
      success: () => fn()
    })
  },

  //选择提醒时间
  showSelectTime(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   selectTime: e.detail.value
    // })
    const now = new Date()
    const minDate = now.getTime() - 1000 * 60 * 60 * 24
    $wuxCalendar().open({
      value: this.data.day,
      direction: 'vertical',
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          day: displayValues,
        })
      },
    })
  },
  //选择标签
  showTags() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#label').open({
      value: this.data.labelValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },

      options: this.data.labelOptions,
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
            labelValue: value,
            // title3: index.map((n) => options[n].title),
            label: options[index].title,
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