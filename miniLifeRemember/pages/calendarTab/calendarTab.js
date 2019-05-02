const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const buttons = [{

    label: '记录',
    className: 'newSubButoon'
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
  }
]
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()], // 月份字符串
    buttons,
    birthdayData: [],
    lunarStatus: false,
    my_calendar_style: [],
    current: '2',
    pagesOption: [
      '../../pages/recordPage/recordPage',
      '../../pages/schedule/schedule',
      '../../pages/calendarTab/calendarTab',
      '../../pages/moneyAccount/moneyAccount',
      '../../pages/myInfo/myInfo'
    ],

    // thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
    islunar: false,
    spinning: true
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
    // this.triggerEvent('changeBar', e)
  },
  dayChoose: function(event) {
    try {
      // 同步接口立即写入
      let nowMonth = ''
      if (event.detail.month < 10) {
        nowMonth = '0' + event.detail.month
      } else {
        nowMonth = event.detail.month
      }
      let nowDay = ''
      if (event.detail.day < 10) {
        nowDay = '0' + event.detail.day
      } else {
        nowDay = event.detail.day
      }
      let date = event.detail.year + '-' + nowMonth + '-' + nowDay
      wx.setStorageSync('selectedDay', date);
      wx.navigateTo({
        url: '/pages/dayOption/dayOption?date=' + event.detail
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
      lunarStatus: e.detail.value
    })

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  headerDateChange(e){
    console.log(e)
    this.setData({
      year:e.detail.currentYear,
      month:e.detail.currentMonth
    })
    this.onLoad()
  },
  prevMonth(e){
    console.log(e)
    this.setData({
      year: e.detail.currentYear,
      month: e.detail.currentMonth
    })
    this.onLoad()
  },
  nextMonth(e){
    console.log(e)
    this.setData({
      year: e.detail.currentYear,
      month: e.detail.currentMonth
    })
    this.onLoad()

  },
  //新建按钮点击
  onNewClick(e) {
    console.log(e)
    let vm = this;
    switch (e.detail.index) {
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
  selectLunar(e) {
    this.onChange('islunar', e)
    this.setData({

    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  selectBirthday(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/showBirthday/showBirthday?id=' + e.currentTarget.dataset.birthdayid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const vm = this;
    wx.setNavigationBarTitle({
      title: '徒步浪的随记'
    })
    const days_count = new Date(vm.data.year, vm.data.month, 0).getDate();
    console.log(days_count)
    let my_calendar_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(vm.data.year, vm.data.month - 1, i);
      // if (date.getDay() == 0) {
      //   my_calendar_style.push({
      //     month: 'current', day: i, color: '#f488cd'
      //   });
      // } else {
      my_calendar_style.push({
        month: 'current',
        day: i,
        color: '#a18ada'
      });
      // }
    }
    my_calendar_style.push({
      month: 'current',
      day: vm.data.day,
      color: 'white',
      background: '#aad4f5'
    });

    // my_calendar_style.push({ month: 'current', day: 12, color: 'white', background: '#b49eeb' });
    // my_calendar_style.push({ month: 'current', day: 17, color: 'white', background: '#f5a8f0' });
    // my_calendar_style.push({ month: 'current', day: 20, color: 'white', background: '#aad4f5' });
    // my_calendar_style.push({ month: 'current', day: 25, color: 'white', background: '#84e7d0' });

    vm.setData({
      my_calendar_style,
      spinning: true
    });

    // let date = new Date();
    // console.log(`${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`)
    let nowMonth = ''
    if (vm.data.month < 10) {
      nowMonth = '0' + vm.data.month
    } else {
      nowMonth = vm.data.month
    }
    let nowDay = ''
    if (vm.data.day < 10) {
      nowDay = '0' + vm.data.day
    } else {
      nowDay = vm.data.day
    }
    app.checkSkey().then(() => {
      let day = nowMonth + '-' + nowDay
      console.log(day)
      wx.request({
        url: app.globalData.url + '/getBirthdayByDay/' + wx.getStorageSync('userId') + '/' + day,
        success(res) {
          console.log(res);
          vm.setData({
            birthdayData: res.data,
            spinning: false
          })
        },
        error(err) {
          vm.setData({
            spinning: false
          })
          console.log(err);
        }
      })
    })
  },
})