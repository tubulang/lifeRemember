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
    inputContentValue: '',
    outputContentValue: '',
    output: '',
    outputValue: '',
    input: '',
    inputValue: '',
    isLoading: false,
    outputOptions: [],
    inputOptions: [],
    inputMoney: '',
    outputMoney: '',
    isIncome: true,
    moneyId: ''
  },
  onChangeCard(e) {
    if (e.detail.key === 0) {
      this.setData({
        isIncome: true,
        output: '',
        outputValue: '',
        outputContentValue: '',
        outputMoney: ''
      })
    } else {
      this.setData({
        isIncome: false,
        input: '',
        inputValue: '',
        inputContentValue: '',
        inputMoney: ''
      })
    }
  },
  inputChange(e) {
    console.log(e)
    this.setData({
      inputMoney: e.detail.value
    })
  },
  outputChange(e) {
    console.log(e)
    this.setData({
      outputMoney: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // app.checkSkey();
    //获取output数据
    // if(wx.getStorageSync('userId')){
    let vm = this;
    wx.setNavigationBarTitle({
      title: '编辑收入'
    })
    vm.setData({
      moneyId: options.moneyId
    })
    app.checkSkey().then(() => {
      const moneyTypePromise = new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + '/getMoneyType/' + wx.getStorageSync('userId'), // 仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let inputData = [],
              outputData = [];
            console.log(res.statusCode)
            if (res.statusCode === 200) {

              res.data.forEach((v, index) => {
                console.log(index)
                outputData.push({ 'title': '', 'value': '' })
                inputData.push({ 'title': '', 'value': '' })
                if (v.type === 'income') {
                  inputData.push({
                    'title': v.name,
                    'value': v.id
                  })
                } else {
                  outputData.push({
                    'title': v.name,
                    'value': v.id
                  })
                }
              });
              vm.setData({
                outputOptions: outputData,
                inputOptions: inputData
              })
              resolve();
            }
            console.log(res.data)
          },
          error(err) {
            console.log(err)
            reject();
          }
        })
      }).then(()=>{
        wx.request({
          url: app.globalData.url + '/moneyAccount/' + options.moneyId,
          success(res){
            console.log(res)
            let inputData = ''
            vm.data.inputOptions.forEach(v => {
              if (v.value === res.data.moneyTypeId) {
                inputData = v.title
              }
            })
            vm.setData({
              inputContentValue: res.data.comment,
              inputValue: res.data.moneyTypeId,
              input: inputData,
              // degreeValue: getRecordData.degreeNumber,
              // 'remindTime[0]': getRecordData.remindTime,
              inputMoney: res.data.money
              // classificationValue: getRecordData.class
            })
          },
          error(err){
            console.log(err)
          }
        })
      })

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
  //保存记录
  submitMoneyAccount(e) {
    // this.setData({
    //   isLoading: true
    // })
    let sendData = {};
    let vm =this;
    if (this.data.isIncome) {
      sendData = {
        accountType: 'income',
        comment: this.data.inputContentValue,
        creator: wx.getStorageSync('userId'),
        moneyTypeId: +this.data.inputValue,
        money: +this.data.inputMoney
      }
    } else {
      sendData = {
        accountType: 'expend',
        comment: this.data.outputContentValue,
        creator: wx.getStorageSync('userId'),
        moneyTypeId: +this.data.outputValue,
        money: +this.data.outputMoney
      }
    }
    wx.request({
      url: app.globalData.url + '/formIdGroup',
      method: 'post',
      data: {
        formId: e.detail.formId,
        creator: wx.getStorageSync('userId'),
      },
      success(res) {
        console.log(sendData)
        if(!sendData.money){
          vm.showToast('forbidden', '请填写正确的金额', () => { })

        }else{
          wx.request({
            url: app.globalData.url + '/moneyAccount/' + vm.data.moneyId, // 仅为示例，并非真实的接口地址
            data: sendData,
            method: 'PUT',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              wx.reLaunch({
                url: '/pages/moneyAccount/moneyAccount',
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
  setInputContentValue(e) {
    this.setData({
      inputContentValue: e.detail.value
    })
  },
  setOutputContentValue(e) {
    this.setData({
      outputContentValue: e.detail.value
    })
  },
  //选择input种类
  showInputType() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#input').open({
      value: this.data.inputValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },

      options: this.data.inputOptions,
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
            inputValue: value,
            // title3: index.map((n) => options[n].title),
            input: options[index].title,
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
  showOutputType() {
    console.log('test')
    // this.triggerEvent('showSelect')
    $wuxSelect('#output').open({
      value: this.data.outputValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },
      options: this.data.outputOptions,
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
            outputValue: value,
            // title3: index.map((n) => options[n].title),
            output: options[index].title,
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