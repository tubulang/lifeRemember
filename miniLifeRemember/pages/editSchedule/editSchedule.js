// pages/editRecord/editRecord.js
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
    havePlanTime: false,
    planTime: [],
    remindTime: [],
    openSchedule: false,
    contentValue: '',
    degreeValue: '',
    label: '',
    labelValue: '',
    classification: '',
    classificationValue: '',
    scheduleStatus: 'undo',
    scheduleId: '',
    // myTypeValue: '',
    // myType: '',
    isLoading: false,
    labelOptions: [],
    classificationOptions: [],

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
      title: '编辑日程'
    })
    console.log(options)
    vm.setData({
      scheduleId: options.scheduleId
    })
    app.checkSkey().then(() => {
      //获取标签
      const labelPromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getLabel/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = [];
            console.log(res.data)
            if (res.statusCode === 200) {
              res.data.forEach((v, index) => {
                // console.log(index)
                data.push({ 'title': '', 'value': '' })
                data.push({
                  'title': v.name,
                  'value': v.id
                })
              });
              vm.setData({
                labelOptions: data
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
      const classificationPromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getClassification/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = [];
            console.log(res.statusCode)
            if (res.statusCode === 200) {
              res.data.forEach((v, index) => {
                // console.log(index)
                data.push({
                  'title': v.name,
                  'value': v.id
                })
              });
              vm.setData({
                classificationOptions: data
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
      let getClassificationData = []
      //获取record信息
      const recordPromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/timeManage/' + options.scheduleId, // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              getClassificationData = res.data
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
      Promise.all([labelPromise, classificationPromise, recordPromise]).then(() => {
        console.log(getClassificationData)
        let classificationData = ''
        this.data.classificationOptions.forEach(v => {
          if (v.value === getClassificationData.classificationId) {
            classificationData = v.title
          }
        })
        vm.setData({
          contentValue: getClassificationData.schedule,
          // labelValue: getClassificationData.labelId,
          // label: labelData,
          degreeValue: getClassificationData.degreeNumber,
          'planTime[0]': getClassificationData.planTime,
          scheduleStatus: getClassificationData.status,
          classificationValue: getClassificationData.classificationId,
          classification: classificationData
        })
        console.log(this.data.labelOptions)
      })
    })

    // }

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
  //修改记录
  submitSchedule(e) {
    // this.setData({
    //   isLoading: true
    // })
    const vm = this;
    wx.request({
      url: app.globalData.url + '/formIdGroup',
      method: 'post',
      data: {
        formId: e.detail.formId,
        creator: wx.getStorageSync('userId'),
      },
      success(res) {
        let sendData = {
          // labelId: +this.data.labelValue,
          degreeNumber: +vm.data.degreeValue,
          classificationId: +vm.data.classificationValue,
          schedule: vm.data.contentValue,
          planTime: vm.data.planTime[0],
          creator: wx.getStorageSync('userId'),
          status: vm.data.scheduleStatus
        }
        console.log(sendData)
        if(!sendData.schedule){
          vm.showToast('forbidden', '请填写计划内容', () => { })
        }else{
          wx.request({
            url: app.globalData.url + '/timeManage/' + vm.data.scheduleId, // 仅为示例，并非真实的接口地址
            data: sendData,
            method: 'PUT',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              wx.reLaunch({
                url: '/pages/schedule/schedule',
              })
            },
            error(err) {
              console.log(err)
            }
          })
        }
      },
      error(err){
        console.log(err)
      }
    })
    
    console.log(e)
  },
  //内容
  setContentValue(e) {
    this.setData({
      contentValue: e.detail.value
    })
  },
  setScheduleStatus(e) {
    let changeStatus = '';
    if (this.data.scheduleStatus === 'undo') {
      changeStatus = 'finish'
    } else {
      changeStatus = 'undo'
    }
    this.setData({
      scheduleStatus: changeStatus,
    })
  },
  //选择提醒时间
  showRemindTime(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   remindTime: e.detail.value
    // })
    const now = new Date()
    const minDate = now.getTime() - 1000 * 60 * 60 * 24
    $wuxCalendar().open({
      value: this.data.remindTime,
      minDate,
      direction: 'vertical',
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          remindTime: displayValues,
        })
      },
    })
  },

  //选择计划时间
  showPlanTime() {
    const now = new Date()
    const minDate = now.getTime() - 1000 * 60 * 60 * 24
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
  setDegree(e) {
    this.setData({
      degreeValue: e.detail.value
    })
    console.log('priority', this.data.degreeValue)
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

  //选择类别
  showTypes() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#classification').open({
      value: this.data.classificationValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },
      options: this.data.classificationOptions,
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
            classificationValue: value,
            // title3: index.map((n) => options[n].title),
            classification: options[index].title,
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