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
    
    value4: ['1'],
      right: [{
        text: '编辑',
        style: 'background-color: #11c1f3; color: white; width: 3.5rem;',
      },
      {
        text: '完成',
        style: 'background-color: #33cd5f; color: white; width: 3.5rem;'
      }],
      left: [{
        text: '删除',
        style: 'background-color: #F4333C; color: white; width: 3.5rem;',
      }],
    viewData:'aa'
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openRecordBar(){
      // console.log('daf')
      this.triggerEvent('openBar')
    },
    leftOperator(e){
     console.log('onClick', e.detail,e)
    },
    selectTap(e){
      console.log('aa')
      this.triggerEvent('selectTap',e,{composed:true})
    },
    // onTap(e){
    //   this.triggerEvent('click', e, {composed:true})
    // },
    rightOperator(e){
      if (e.detail.index === 0) {
        console.log(e.detail.value)
        return false
      }
      if (e.detail.index === 1) {
        console.log(e.detail.value)
      }
    },
    onClick(e) {
      
      switch(e.detail.type){
        case 'left':this.leftOperator(e)
        break;
        case 'right':this.rightOperator(e)
        break;
        default:
        break;
      }
      
    },
    onShare() {
      console.log('onShare')
    },

    //checkbox
    onChange(field, e) {
      const { value } = e.detail
      const data = this.data[field]
      const index = data.indexOf(value)
      const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

      this.setData({
        [field]: current,
      })

      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    onChange1(e) {
      this.onChange('value1', e)
    },
  }
})
