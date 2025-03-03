// myComponent/selectAction/index.js
import { $wuxSelect } from '../../miniprogram_npm/wux-weapp/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value1: '',
    title1: '',
    value2: '',
    title2: '',
    myTypeValue: '',
    myType: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      console.log('test')
      this.triggerEvent('showSelect')
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
          console.log('onConfirm',index)
          if(index !== -1){
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
  }
})