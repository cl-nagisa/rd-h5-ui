// by fl
export default {
  data() {
    return {
      nowYear: new window.Date().getFullYear(), // 当前年份
      nowMonth: new window.Date().getMonth() + 1, // 当前月份
      nowDate: new window.Date().getDate(), // 当前日期
      dateYearMax: 2050, // 设置可选时间段极值（最大值），可根据需要更改
      dateYearMin: 1950, // 设置可选时间段极值（最小值），可根据需要更改
      currentYear: '', // 当前所选年份
      currentMonth: '', // 当前所选月份
      dateSelect: '', // 实时所选结果
      dateConfirm: '', // 确认所选结果
      dateYear: [], // 可选年份
      dateMonth: [], // 可选月份
      dateDate: [], // 可选日期
      isDatePickerShow: false, // 日期选择器是否显示，true显示
      dateSlots: [
        { values: '', flex: '0 auto', width: '25%' },
        { divider: true, content: '年', flex: '0 auto', width: '10%' },
        { values: '', flex: '0 auto', width: '20%' },
        { divider: true, content: '月', flex: '0 auto', width: '10%' },
        { values: '', flex: '0 auto', width: '20%' },
        { divider: true, content: '日', flex: '0 auto', width: '10%' }
      ]
    };
  },
  methods: {
    // 初始化日期选择器数据
    _initDateData() {
      this._initDateYearData(this.dateYearMin, this.dateYearMax);
      this._initDateMonthData();
      this._initDateDateData(this.nowYear, this.nowMonth);
      this._initPositionByNowDate(this.nowYear, this.nowMonth, this.nowDate);
    },
    // 根据所设置可选时间段极值来初始化可选年份数据，2050年-1950年
    _initDateYearData(start, end) {
      start = Number(start);
      end = Number(end);
      for (var i = start; i <= end; i++) {
        this.dateYear.push(i);
      }
      this.dateSlots[0].values = this.dateYear;
    },
    // 初始化可选月份数据，1月-12月
    _initDateMonthData() {
      for (var i = 1; i <= 12; i++) {
        this.dateMonth.push(i);
      }
      this.dateSlots[2].values = this.dateMonth;
    },
    // 根据当前所选月份来初始化可选日期数据，1日-31日，1日-30日，1日-28日，1日-29日
    _initDateDateData(year, month) {
      this.dateDate = [];
      year = Number(year);
      month = Number(month);
      let isLeapYear = false; // 是否是闰年，true是闰年
      let date = 0; // 日期，28,29,30,31
      let bigMonth = [ 1, 3, 5, 7, 8, 10, 12 ]; // 含有31天的月份
      let smallMonth = [ 4, 6, 9, 11 ]; // 含有30天的月份
      if (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)) { // 判断闰年
        isLeapYear = true;
      }
      if (this.contains(bigMonth, month)) { // 判断是否是大月
        date = 31;
      } else if (this.contains(smallMonth, month)) { // 判断是否是小月
        date = 30;
      } else if (month === 2) { // 判断2月是28天还是29天
        date = isLeapYear ? 29 : 28;
      }
      for (var i = 1; i <= date; i++) {
        this.dateDate.push(i);
      }
      this.dateSlots[4].values = this.dateDate;
    },
    // 默认所选时间为系统当前时间
    _initPositionByNowDate(year, month, date) {
      for (var i = 0; i < this.dateYear.length; i++) {
        if (Number(this.dateYear[i]) === Number(year)) {
          this.dateSlots[0].defaultIndex = i;
          this.currentYear = year;
        }
      }
      for (var j = 0; j < this.dateMonth.length; j++) {
        if (Number(this.dateMonth[j]) === Number(month)) {
          this.dateSlots[2].defaultIndex = j;
          this.currentMonth = month;
        }
      }
      for (var k = 0; k < this.dateDate.length; k++) {
        if (Number(this.dateDate[k]) === Number(date)) {
          this.dateSlots[4].defaultIndex = k;
        }
      }
    },
    // 显示/关闭日期选择器
    toShowDatePicker() {
      this.isDatePickerShow = !this.isDatePickerShow;
    },
    // 从picker组件中监听到change事件，变换所选数据
    datePickerChange(picker, pickerValue) {
      if (pickerValue[0].value) {
        this.currentYear = pickerValue[0].value;
        this._initDateDateData(this.currentYear, this.currentMonth);
      } else if (pickerValue[1].value) {
        this.currentMonth = pickerValue[1].value;
        this._initDateDateData(this.currentYear, this.currentMonth);
      }
    },
    // 从picker组件中监听到pickerText事件，记录当前实时选择的数据结果
    getDatePickerText(pickerText) {
      this.dateSelect = '';
      for (var i = 0; i < pickerText.length; i++) {
        this.dateSelect = this.dateSelect + ' ' + pickerText[i];
      }
    },
    // 从picker组件中监听到pickerConfirm事件，确认并记录当前所选择的结果
    datePickerConfirm() {
      this.dateConfirm = this.dateSelect;
    },
    // 判断一个数组中是否含有某个值
    contains(arr, obj) {
      let i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    }
  }
};
