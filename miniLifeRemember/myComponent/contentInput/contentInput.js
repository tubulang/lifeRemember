import { $wuxSelect } from '../../miniprogram_npm/wux-weapp/index'
Component({
  /**
     * 组件的属性列表
     */
  properties: {

  },
  /**
   * 页面的初始数据
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
    showSelect(e){
      console.log(e)
    }
    
  }
})