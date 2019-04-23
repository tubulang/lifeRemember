// pages/dayOption/dayOption.js
import { $wuxDialog, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const app = getApp()
const moment = require('../../utils/moment.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    month:'',
    day:'',
    // currentDate: '',
    current: 1,

    tabs: [
      {
        key: 'log',
        title: '记录',
        // content: 'Content of tab 3',
      },
      {
        key: 'schedule',
        title: '日程',
        // content: 'Content of tab 2',
      },
      {
        key: 'birth',
        title: '生日',
        // content: 'Content of tab 1',
      },
      {
        key: 'account',
        title: '账目',
        // content: 'Content of tab 3',
      },
    ],

    //record
    right: [{
      text: '编辑',
      style: 'background-color: #11c1f3; color: white; width: 3.5rem;border: 0px;',
    }
      ,
    {
      text: '详情',
      style: 'background-color: #33cd5f; color: white; width: 3.5rem;border: 0px;'
    }
    ],
    left: [{
      text: '删除',
      style: 'background-color: #F4333C; color: white; width: 3.5rem;border: 0px;',
    }],
    recordData: [],
    searchData: [],
    searchValue: '',

    //birthday
    birthdayData: [],

    //money account
    showInput: true,
    showOutput: false,
    inputData: [],
    ouputData: [],
    moneyVisible: [],

    //schedule
    scheduleVisible: [],
    scheduleData: [],
  },

  //record
  showToast(type, text) {
    $wuxToast().show({
      type: type,
      duration: 1500,
      color: '#fff',
      text: text,
      success: () => console.log(text)
    })
  },
  //删除提示
  confirmRecordDelete(index) {
    let vm = this;
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '删除该记录',
      prefixCls: 'wux-dialog',
      confirmType: 'warn',
      confirmText: '确定',
      content: '你确定要丢弃这条记录吗？',
      onConfirm(e) {
        console.log('已删除')
        wx.request({
          url: app.globalData.url + '/record/' + index, // 仅为示例，并非真实的接口地址
          method: 'DELETE',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let data = vm.data.searchData;
            data = vm.data.searchData.filter(function (v) {
              return v.id != index
            })
            vm.setData({
              searchData: data,
              recordData: data

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
  onSelectChange(e) {
    if (e.detail.checked) {
      this.changeRecordStatus('finish', e.currentTarget.dataset.selectid)
    } else {
      this.changeRecordStatus('undo', e.currentTarget.dataset.selectid)
    }
    console.log(e)
  },
  // openRecordBar() {
  //   // console.log('daf')
  //   this.triggerEvent('openBar')
  // },
  //左边按钮
  leftOperator(e) {
    console.log(e.currentTarget.dataset)
    this.confirmRecordDelete(e.currentTarget.dataset.selectid);
    console.log('onClick', e.detail, e)
  },
  //改变状态
  changeRecordStatus(changeStatus, index) {
    let vm = this;
    wx.request({
      url: app.globalData.url + '/record/' + index, // 仅为示例，并非真实的接口地址
      data: {
        status: changeStatus
      },
      method: 'PUT',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        vm.data.searchData.forEach((v, i) => {
          if (v.id === index) {
            vm.setData({
              [`searchData[${i}].status`]: changeStatus
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
  //右边按钮
  rightOperator(e) {
    if (e.detail.index === 0) {
      console.log(e)
      wx.navigateTo({
        url: '/pages/editRecord/editRecord?recordId=' + e.currentTarget.dataset.selectid
      })
      return false
    }
    if (e.detail.index === 1) {
      // this.finishRecordStatus(e.currentTarget.dataset.selectid)
      // console.log(e)
      console.log(e)
      wx.navigateTo({
        url: '/pages/recordDetail/recordDetail?recordId=' + e.currentTarget.dataset.selectid
      })
      return false
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

  //   ********   birthday
  selectBirthday(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/showBirthday/showBirthday?id=' + e.currentTarget.dataset.birthdayid,
    })
  },

//   ********   moneyAccount
  onChangeCard(e) {
    console.log(e.detail.key)
    if (e.detail.key === 0) {
      this.setData({
        showInput: true,
        showOutput: false
      })
    } else if (e.detail.key === 1) {
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
    this.triggerEvent('changeBar', e)
  },
  hideMoney(e) {
    this.setData({
      // [`searchData[${i}].status`]
      [`moneyVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  selectInput(e) {
    this.hideAllMoneyPopover(e)
  },
  longSelectInput(e) {
    this.hideAllMoneyPopover(e)
    this.setData({
      // [`searchData[${i}].status`]
      [`moneyVisible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  selectOutput(e) {
    this.hideAllMoneyPopover(e)
  },
  longSelectOutput(e) {
    this.hideAllMoneyPopover(e)
    this.setData({
      // [`searchData[${i}].status`]
      [`moneyVisible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  onMoneyPopoverChange(e) {
    console.log('onChange', e)
    this.setData({
      // [`searchData[${i}].status`]
      [`moneyVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  hideAllMoneyPopover(e) {
    console.log(e)
    let moneyVisibleArray = [];
    this.data.moneyVisible.forEach((v, index) => {
      moneyVisibleArray[index] = false;
    })
    this.setData({
      // [`searchData[${i}].status`]
      moneyVisible: moneyVisibleArray,
    })
  },
  deleteInput(e) {
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`moneyVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmMoneyDelete(e.currentTarget.dataset.index, 'input')
  },
  editInput(e) {
    this.hideAllMoneyPopover(e)
    wx.navigateTo({
      url: '/pages/editInputMoneyAccount/editInputMoneyAccount?moneyId=' + e.currentTarget.dataset.index,
    })
  },
  editOutput(e) {
    this.hideAllMoneyPopover(e)
    wx.navigateTo({
      url: '/pages/editOutputMoneyAccount/editOutputMoneyAccount?moneyId=' + e.currentTarget.dataset.index,
    })
  },
  deleteOutput(e) {
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`moneyVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmMoneyDelete(e.currentTarget.dataset.index, 'output')
  },
  //删除提示
  confirmMoneyDelete(index, type) {
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
            let moneyVisibleArray = [];
            for (let k of data) {
              console.log(k)
              moneyVisibleArray[k.id] = false
            }
            if (type === 'input') {
              data = vm.data.inputData.filter(function (v) {
                return v.id != index
              })
              vm.setData({
                inputData: data,
                moneyVisible: moneyVisibleArray
                // recordData: data
              })
            } else {
              data = vm.data.outputData.filter(function (v) {
                return v.id != index
              })
              vm.setData({
                outputData: data,
                moneyVisible: moneyVisibleArray
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

  //  schedule   *******
  deleteSchedule(e) {
    console.log(e)
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    vm.confirmScheduleDelete(e.currentTarget.dataset.index)
  },
  //删除提示
  confirmScheduleDelete(index) {
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
  changeScheduleStatus(e) {
    console.log(e);
    const vm = this;
    // vm.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    const id = e.currentTarget.dataset.index;
    let changeStatus = '';
    console.log(id)
    console.log(vm.data.scheduleData)
    // console.log(vm.data.scheduleData[id].status)
    let indexId = 0;
    for (let k = 0; k < vm.data.scheduleData.length; k++) {
      if (vm.data.scheduleData[k].id === id) {
        indexId = k;
      }
    }
    console.log(indexId)
    if (vm.data.scheduleData[indexId].status === 'undo') {
      changeStatus = 'finish'
    } else {
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
  selectSchedule(e) {
    // console.log(event.currentTarget.dataset.index)
    // this.setData({
    //   // [`searchData[${i}].status`]
    //   [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    // })
    this.hideAllSchedulePopover();
    wx.navigateTo({
      url: '/pages/editSchedule/editSchedule?scheduleId=' + e.currentTarget.dataset.index
    })
  },
  longSelectSchedule(e) {
    console.log(e)
    console.log(this.data.scheduleVisible)
    this.hideAllSchedulePopover();
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: true,
    })
  },
  hideSchedule(e) {
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  onSchedulePopoverChange(e) {
    console.log('onChange', e)
    this.setData({
      // [`searchData[${i}].status`]
      [`scheduleVisible[${e.currentTarget.dataset.index}]`]: false,
    })
  },
  hideAllSchedulePopover(e) {
    console.log(e)
    let scheduleVisibleArray = [];
    this.data.scheduleVisible.forEach((v, index) => {
      scheduleVisibleArray[index] = false;
    })
    this.setData({
      // [`searchData[${i}].status`]
      scheduleVisible: scheduleVisibleArray,
    })
  },


  //  all
  hideAllPopover(){
    this.hideAllMoneyPopover();
    this.hideAllSchedulePopover();
  },
  previousDay(e){
    let currentDay = moment(wx.getStorageSync('selectedDay')).subtract(1, 'day').format("YYYY-MM-DD")
    wx.setStorageSync('selectedDay', currentDay)
    // wx.setStorageSync('selectedDay', currentDay)
    console.log(currentDay)
    this.onLoad()
  },
  forwardDay(e){
    let currentDay = moment(wx.getStorageSync('selectedDay')).add(1, 'day').format("YYYY-MM-DD")
    wx.setStorageSync('selectedDay', currentDay)
    console.log(e);
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '徒步浪的随记'
    })
    console.log(wx.getStorageSync('selectedDay'))
    let date = moment(wx.getStorageSync('selectedDay'), "YYYY-MM-DD")
    console.log(date.date())
    const selectDay = `${date.get('year')}-${date.get('month')+1}-${date.get('date')}`
    console.log(selectDay)
    console.log(date)
    let birthMonth = '',birthDay = '';
    if (date.get('month') + 1 < 10){
      birthMonth = '0' + (date.get('month') + 1)
    }
    if (date.get('date') < 10){
      birthDay = '0' + date.get('date')
    }
    const selectDayBir = `${birthMonth}-${birthDay}`
    const vm = this;
    console.log(wx.getStorageSync('sessionKey'))
    // wx.setNavigationBarTitle({
    //   title: '徒步浪的随记'
    // })
    //record
    app.checkSkey().then(() => {
      wx.request({
        url: app.globalData.url + '/getRecordByDay/' + wx.getStorageSync('userId') + '/' + selectDay,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          vm.setData({
            recordData: res.data,
            searchData: res.data
          })
        },
        error(err) {
          console.log(err)
        }
      })
    })

    //birthday
    app.checkSkey().then(() => {
      wx.request({
        url: app.globalData.url + '/getBirthdayByDay/' + wx.getStorageSync('userId') + '/' + selectDayBir,
        success(res) {
          console.log(res);
          vm.setData({
            birthdayData: res.data
          })
        },
        error(err) {
          console.log(err);
        }
      })
    })

    //moneyAccount
    app.checkSkey().then(() => {
      wx.request({
        url: app.globalData.url + '/getMoneyAccountByDay/' + wx.getStorageSync('userId') + '/' + selectDay,
        success(res) {
          console.log(res)
          let inputArray = [], outputArray = [];
          let moneyVisibleArray = [];
          for (let k of res.data) {
            console.log(k)
            moneyVisibleArray[k.id] = false
          }
          if (res.data) {
            res.data.forEach(v => {
              if (v.accountType === 'expend') {
                outputArray.push(v)
              } else {
                inputArray.push(v)
              }
            })
          }
          vm.setData({
            outputData: outputArray,
            inputData: inputArray,
            moneyVisible: moneyVisibleArray
          })
          console.log(outputArray, inputArray)
        },
        error(err) {
          console.log(err)
        }
      })
    })


    //schedule
    app.checkSkey().then(() => {
      wx.request({
        url: app.globalData.url + '/getTimeManageByDay/' + wx.getStorageSync('userId') + '/' + selectDay,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data[0].id)
          let scheduleVisibleArray = [];
          for (let k of res.data) {
            console.log(k)
            scheduleVisibleArray[k.id] = false
          }
          vm.setData({
            scheduleData: res.data,
            // searchData: res.data
            scheduleVisible: scheduleVisibleArray
          })
          console.log(scheduleVisibleArray)
        },
        error(err) {
          console.log(err)
        }
      })
    })


    this.key = Math.floor(Math.random() * 3)
    // console.log(options.date.day)
    try {
      // 同步接口立即返回值
      
      console.log(date.year(),date.month(),date.day())
      this.setData({
        year: date.get('year'),
        month: date.get('month') + 1,
        day: date.get('date')
      })

    } catch (e) {

      console.log('读取key2发生错误')

    }

  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  onChange(e) {
    console.log(e)

    if (e.detail.key === this.key) {
      return wx.showModal({
        title: 'No switching is allowed',
        showCancel: !1,
      })
    }

    this.setData({
      current: e.detail.key,
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