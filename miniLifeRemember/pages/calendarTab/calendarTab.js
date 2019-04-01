const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串

    lunarStatus:false,
    my_calendar_style: [],
    current:'2',
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo'
    ],

    // thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
    islunar: false,
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
  dayChoose:function(event){
    try {

      // 同步接口立即写入

      wx.setStorageSync('selectedDay', JSON.stringify(event.detail));
      wx.navigateTo({
        url: '/pages/dayOption/dayOption?date='+event.detail
      })

      console.log('写入value2成功')

    } catch (e) {

      console.log('写入value2发生错误')

    }
    console.log(event.detail);
  },
  onChange(field, e) {
    this.setData({
      [field]: e.detail.value,
      lunarStatus:e.detail.value
    })
    
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  selectLunar(e) {
    this.onChange('islunar', e)
    this.setData({
      
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    console.log(days_count)
    let my_calendar_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      // if (date.getDay() == 0) {
      //   my_calendar_style.push({
      //     month: 'current', day: i, color: '#f488cd'
      //   });
      // } else {
        my_calendar_style.push({
          month: 'current', day: i, color: '#a18ada'
        });
      // }
    }
    my_calendar_style.push({ month: 'current', day: this.data.day, color: 'white', background: '#aad4f5' });

    // my_calendar_style.push({ month: 'current', day: 12, color: 'white', background: '#b49eeb' });
    // my_calendar_style.push({ month: 'current', day: 17, color: 'white', background: '#f5a8f0' });
    // my_calendar_style.push({ month: 'current', day: 20, color: 'white', background: '#aad4f5' });
    // my_calendar_style.push({ month: 'current', day: 25, color: 'white', background: '#84e7d0' });

    this.setData({
      my_calendar_style
    });

    
  },
})