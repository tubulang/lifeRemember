// pages/footerBar/footerBar.js
// myComponent/recordList/recordList.js
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
    current: '1',
    pagesOption:[
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
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
  }
})