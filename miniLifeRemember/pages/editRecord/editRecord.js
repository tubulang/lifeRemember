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
    recordStatus: 'undo',
    recordId: '',
    // myTypeValue: '',
    // myType: '',
    isLoading: false,
    labelOptions: [],
    classificationOptions: [],
    spinning:true,
    isSubmit:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // app.checkSkey();
    //获取label数据
    // if(wx.getStorageSync('userId')){
    let vm = this;
    wx.setNavigationBarTitle({
      title: '编辑记录'
    })
    console.log(options)
    vm.setData({
      recordId: options.recordId,
      spinning:true
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
              data.push({ 'title': '', 'value': '' })
              res.data.forEach((v, index) => {
                // console.log(index)
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
      let getRecordData = []
      //获取record信息
      const recordPromise = new Promise((resolve, reject) => {      
        wx.request({
          url: app.globalData.url + '/record/' + options.recordId, // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              getRecordData = res.data
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
        console.log(getRecordData.recordContent)
        let labelData = ''
        this.data.labelOptions.forEach(v=>{
          if(v.value === getRecordData.labelId){
            labelData = v.title
          }
        })
        // let getRemindTime = ''
        if (getRecordData.remindTime){
          vm.setData({
            'remindTime[0]': getRecordData.remindTime,
          })
        } 
        console.log(getRecordData.remindTime)
        // console.log(getRemindTime)
        vm.setData({
          contentValue: getRecordData.recordContent,
          labelValue: getRecordData.labelId,
          label: labelData,
          degreeValue: getRecordData.degreeNumber,
          
          recordStatus: getRecordData.status,
          spinning:false
          // classificationValue: getRecordData.class
        })
        console.log(this.data.labelOptions)
      })
    })
    
    // }

  },
  showToast(type, text, fn) {
    $wuxToast().show({
      type: type,
      duration: 1000,
      color: '#fff',
      text: text,
      success: () => fn()
    })
  },
  //修改记录
  submitRecord(e) {
    // this.setData({
    //   isLoading: true
    // })
    const vm = this
    
    wx.request({
      url: app.globalData.url + '/formIdGroup',
      method: 'post',
      data: {
        formId: e.detail.formId,
        creator: wx.getStorageSync('userId'),
      },
      success(res) {
        let sendData = {
          labelId: +vm.data.labelValue,
          degreeNumber: +vm.data.degreeValue,
          // classificationId: +this.data.classificationValue,
          recordContent: vm.data.contentValue,
          remindTime: vm.data.remindTime[0],
          creator: wx.getStorageSync('userId'),
          status: vm.data.recordStatus
        }
        if(sendData.recordContent){
          vm.setData({
            isSubmit: true
          })
          wx.request({
            url: app.globalData.url + '/record/' + vm.data.recordId, // 仅为示例，并非真实的接口地址
            data: sendData,
            method: 'PUT',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
              vm.showToast('success', '提交成功', () => { wx.reLaunch({
                url: '/pages/recordPage/recordPage',
              })})
              
            },
            error(err) {
              console.log(err)
              vm.setData({
                isSubmit: false
              })
            }
          })
        }else{
          vm.showToast('forbidden','请填写记录内容',()=>{})
        }
        console.log(sendData)
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
  setRecordStatus(e) {
    let changeStatus = '';
    if (this.data.recordStatus === 'undo') {
      changeStatus = 'finish'
    } else {
      changeStatus = 'undo'
    }
    this.setData({
      recordStatus: changeStatus,
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