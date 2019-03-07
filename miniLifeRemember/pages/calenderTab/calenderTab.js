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
    demo1_days_style: [],
    demo2_days_style: [],
    demo4_days_style: [],
    demo5_days_style: [],
    demo6_days_style: [],

    thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
    value1: false,
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
    this.onChange('value1', e)
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
    let demo1_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (parseInt(Math.random() * 100) > 50) {
        demo1_days_style.push({
          month: 'current', day: i, color: 'white', background: '#8497ee'
        });
      } else {
        demo1_days_style.push({
          month: 'current', day: i, color: 'white'
        });
      }
    }
    this.setData({
      demo1_days_style
    });

    let demo2_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == 12) {
        demo2_days_style.push({
          month: 'current', day: i, color: '#314580', background: '#ffed09'
        });
      } else if (i == 16) {
        demo2_days_style.push({
          month: 'current', day: i, color: 'white', background: '#30558c'
        });
      } else if (i == 21) {
        demo2_days_style.push({
          month: 'current', day: i, color: 'white', background: '#3c5281'
        });
      } else {
        demo2_days_style.push({
          month: 'current', day: i, color: 'white'
        });
      }
    }
    this.setData({
      demo2_days_style
    });

    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == 3) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: '#46c4f3'
        });
      } else if (i == 7) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: '#ffb72b'
        });
      } else if (i == 12 || i == 23 || i == 24) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: '#865fc1'
        });
      } else if (i == 21 || i == 22) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: '#eb4986'
        });
      } else {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white'
        });
      }
    }
    this.setData({
      demo4_days_style
    });

    let demo5_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      if (date.getDay() == 0) {
        demo5_days_style.push({
          month: 'current', day: i, color: '#f488cd'
        });
      } else {
        demo5_days_style.push({
          month: 'current', day: i, color: '#a18ada'
        });
      }
    }
    demo5_days_style.push({ month: 'current', day: 12, color: 'white', background: '#b49eeb' });
    demo5_days_style.push({ month: 'current', day: 17, color: 'white', background: '#f5a8f0' });
    demo5_days_style.push({ month: 'current', day: 20, color: 'white', background: '#aad4f5' });
    demo5_days_style.push({ month: 'current', day: 25, color: 'white', background: '#84e7d0' });

    this.setData({
      demo5_days_style
    });

    let demo6_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      if (i == 12) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#b49eeb'
        });
      } else if (i == 17) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#f5a8f0'
        });
      } else if (i == 21) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#aad4f5'
        });
      } else if (i == 25) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#84e7d0'
        });
      } else {
        demo6_days_style.push({
          month: 'current', day: i, color: 'black'
        });
      }
    }

    this.setData({
      demo6_days_style
    });
  },
})