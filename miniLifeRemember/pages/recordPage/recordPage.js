// pages/recordPage/recordPage.js
import { $wuxDialog, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const buttons = [{
  
  label: '记录',
  className:'newSubButoon'
  // icon,
},
{
  // openType: 'share',
  label: '日程',
  className: 'newSubButoon'
  // icon,
},
{
  // openType: 'contact',
  label: '生日',
  className: 'newSubButoon'
  // icon,
},
{
  label: '账目',
  // openType: 'getUserInfo',
  className: 'newSubButoon'
  // icon,
},
]

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '0',
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo',
    ],
    post:'post',
    buttons,
    recordData: [],
    searchData: [],
    che: true,
    value4: ['1'],
    done: true,
    searchValue: '',
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
    spinning:true
    // viewData: 'aa'
  },
  showToast(type,text) {
    $wuxToast().show({
      type: type,
      duration: 1500,
      color: '#fff',
      text: text,
      success: () => console.log(text)
    })
  },
  //切换tab
  onChangeTab(e){
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
  //新建按钮点击
  onNewClick(e){
    console.log(e)
    let vm = this;
    switch(e.detail.index){
      case 0:
        wx.navigateTo({
          url: '/pages/newRecord/newRecord'
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/newSchedule/newSchedule'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/newBirthday/newBirthday'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/newMoneyAccount/newMoneyAccount'
        })
        break;
      default:
        break;
    }
      
  },
  //删除提示
  confirmDelete(index) {
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
            data = vm.data.searchData.filter(function(v){
              return v.id!=index
            })
            vm.setData({
              searchData: data,
              recordData: data

            })
            vm.showToast('success','已删除')
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
  onSelectChange(e){
    if(e.detail.checked){
      this.changeRecordStatus('finish',e.currentTarget.dataset.selectid)
    }else{
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
    this.confirmDelete(e.currentTarget.dataset.selectid);
    console.log('onClick', e.detail, e)
  },
  //改变状态
  changeRecordStatus(changeStatus,index){
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
        vm.data.searchData.forEach((v,i)=>{
          if(v.id === index){
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
  onShare() {
    console.log('onShare')
  },

  //checkbox
  onFabButtonChange(e) {
    // const { value } = e.detail
    // const data = this.data[field]
    // const index = data.indexOf(value)
    // const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    // this.setData({
    //   [field]: current,
    // })

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  onSearchChange(e) {
    // this.onChange('value1', e)
    let currentSearchData = [];
    let searchValue = e.detail.value;
    console.log(searchValue)
    this.data.recordData.forEach( v => {
      if(v.recordContent && v.recordContent.search(searchValue)>=0 ||
          v.created_at && v.created_at.search(searchValue)>=0 ||
          v.remindTime && v.remindTime.search(searchValue)>=0){
            console.log(v.recordContent)
            currentSearchData.push(v)
          }
    })
    console.log(currentSearchData)
    this.setData({
      searchData: currentSearchData
    })
    console.log(e)
  },
  selectOperator:function(e){
    console.log(e.detail.detail)
    console.log(e)
  },
  onChangeBar(e){
    console.log(e)
  },
  openRecordBar(e){
    console.log('sdfs')
    
    // this.setData({
    //   [buttons[e.detail.data.index]]:'hideAdd'
    // })
  },
  
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      searchValue: '',
    })
    this.onSearchChange(e)
  },
  onCancel(e) {
    let vm = this;
    vm.onClear(e)
    console.log('this',this.data.searchValue)
    console.log('onCancel', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const vm = this;
    console.log(wx.getStorageSync('sessionKey'))
    wx.setNavigationBarTitle({
      title: '徒步浪的随记'
    })
    vm.setData({
      spinning: true
    })
    app.checkSkey().then(()=>{
      wx.request({
        url: app.globalData.url + '/getRecord/'+wx.getStorageSync('userId'),
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          vm.setData({
            recordData: res.data,
            searchData: res.data,
            spinning: false
          })
        },
        error(err) {
          vm.setData({
            spinning: false
          })
          console.log(err)
        }
      })
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