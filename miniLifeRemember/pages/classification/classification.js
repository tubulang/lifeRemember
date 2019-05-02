import { $wuxSelect } from '../../miniprogram_npm/wux-weapp/index'
const app = getApp()
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'

Page({
  data: {
    classificationData:[],
    visible: false,
    classificationName: '',
    isSubmit:false
  },
  onChangeInput(e){
    console.log(e.detail.value)
    this.setData({
      classificationName: e.detail.value
    })
  },
  openNew() {
    this.setData({
      visible: true,
      classificationName: ''
    })
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
  hide(){
    this.setData({
      visible: false,
      classificationName: ''
    })
  },
  newClassification(){
    const vm = this;
    if (!vm.data.classificationName) {
      vm.showToast('forbidden', '请填写分类信息', () => { })
    } else {
      wx.request({
        url: app.globalData.url + '/classification',
        method: 'POST',
        data:{
          creator: wx.getStorageSync('userId'),
          name: vm.data.classificationName
        },
        success(res){
          console.log(res)
          let data = vm.data.classificationData;
          data.unshift(res.data)
          vm.setData({
            classificationData: data,
            classificationName: ''
          })
          vm.hide();
        },
        error(err){
          consolo.log(err)
          vm.hide();
        }
      })
    }
  },
  onLoad(options){
    const vm = this;
    wx.setNavigationBarTitle({
      title: '分类管理'
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url+'/getClassification/'+wx.getStorageSync('userId'),
        success(res){
          console.log(res)
          vm.setData({
            classificationData: res.data
          })
        },
        error(err){
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
