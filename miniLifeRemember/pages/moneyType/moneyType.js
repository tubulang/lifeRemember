import { $wuxSelect } from '../../miniprogram_npm/wux-weapp/index'
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'

const app = getApp()
Page({
  data: {
    moneyTypeData: [],
    visible: false,
    moneyTypeName: '',
    type: '收入',
    isSubmit: false
  },
  handleTypeChange(e){
    this.setData({
      type: e.detail.value
    });
  },
  onChangeInput(e) {
    console.log(e.detail.value)
    this.setData({
      moneyTypeName: e.detail.value
    })
  },
  openNew() {
    this.setData({
      visible: true,
      moneyTypeName: ''
    })
  },
  hide() {
    this.setData({
      visible: false,
      moneyTypeName: ''
    })
  },
  newMoneyType() {
    const vm = this;
    let typeData = '';
    if(vm.data.type === '收入'){
      typeData = 'income'
    }else{
      typeData = 'expend'
    }
    if (!vm.data.moneyTypeName) {
      vm.showToast('forbidden', '请填写账目类别信息', () => { })
    } else {
      vm.setData({
        isSubmit: true
      })
      wx.request({
        url: app.globalData.url + '/moneyType',
        method: 'POST',
        data: {
          creator: wx.getStorageSync('userId'),
          name: vm.data.moneyTypeName,
          type: typeData
        },
        success(res) {
          console.log(res)
          let data = vm.data.moneyTypeData;
          data.unshift(res.data)
          vm.setData({
            moneyTypeData: data,
            isSubmit: false,
          })
          vm.hide();
        },
        error(err) {
          consolo.log(err)
          vm.setData({
            isSubmit: false
          })
          vm.hide();
        }
      })
    }
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
  onLoad(options) {
    const vm = this;
    wx.setNavigationBarTitle({
      title: '账目类别管理'
    })
    app.checkSkey().then(() => {
      wx.request({
        url: app.globalData.url + '/getMoneyType/' + wx.getStorageSync('userId'),
        success(res) {
          console.log(res)
          vm.setData({
            moneyTypeData: res.data
          })
        },
        error(err) {
          console.log(err)
        }
      })
    })
  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      options: [
        '法官',
        '医生',
        '猎人',
        '学生',
        '记者',
        '其他',
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value1: value,
            title1: options[index],
          })
        }
      },
    })
  },
  onClick2() {
    $wuxSelect('#wux-select2').open({
      value: this.data.value2,
      options: [{
        title: 'iPhone 3GS',
        value: '001',
      },
      {
        title: 'iPhone 5',
        value: '002',
      },
      {
        title: 'iPhone 5S',
        value: '003',
      },
      {
        title: 'iPhone 6',
        value: '004',
      },
      {
        title: 'iPhone 6S',
        value: '005',
      },
      {
        title: 'iPhone 6P',
        value: '006',
      },
      {
        title: 'iPhone 6SP',
        value: '007',
      },
      {
        title: 'iPhone SE',
        value: '008',
      },
      {
        title: 'iPhone 7',
        value: '009',
      },
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value2: value,
            title2: options[index].title,
          })
        }
      },
    })
  },
  showTypes() {
    $wuxSelect('#wux-select3').open({
      value: this.data.myTypeValue,
      // multiple: true,
      toolbar: {
        title: 'Please choose',
        confirmText: 'ok',
        cancelText: 'cancel'
      },
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
      ],
      // onChange: (value, index, options) => {
      //   console.log('onChange', value, index, options)
      //   this.setData({
      //     myTypeValue: value,
      //     // title3: index.map((n) => options[n].title),
      //     myType: options[index].title,
      //   })
      // },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          myTypeValue: value,
          // title3: index.map((n) => options[n].title),
          myType: options[index].title,
        })
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
})
