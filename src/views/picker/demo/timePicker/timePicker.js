// by fl
export default {
  data() {
    return {
      isTimePickerShow: false, // 时间选择器是否显示，true显示
      hoursData: [], // 时钟数组（几点），上午0-11时，下午12-23时
      timeSlots: [
        { values: [ '上午', '下午' ], textAlign: 'right' },
        { divider: true },
        { values: '', textAlign: 'left' }
      ]
    };
  },
  methods: {
    // 初始化时间选择器数据，默认选择“上午”时间段
    _initTimeData() {
      this._initHoursData(1);
      this.timeSlots[2].values = this.hoursData;
    },
     // 加载对应时间段的数据，1上午，2下午
    _initHoursData(type = 1) {
      this.hoursData = [];
      if (type === 1) {
        for (var i = 0; i <= 11; i++) {
          this.hoursData.push(i);
        }
      } else if (type === 2) {
        for (var j = 12; j <= 23; j++) {
          this.hoursData.push(j);
        }
      }
    },
    // 显示/关闭时间选择器
    toShowTimePicker() {
      this.isTimePickerShow = !this.isTimePickerShow;
    },
    // 从picker组件中监听到change事件，变换所选数据
    timePickerChange(picker, pickerValue) {
      if (pickerValue[0].value) {
        if (pickerValue[0].value === '上午') {
          this._initHoursData(1);
        } else if (pickerValue[0].value === '下午') {
          this._initHoursData(2);
        }
        picker.setSlotValues(2, this.hoursData);
      }
    }
  }
};
