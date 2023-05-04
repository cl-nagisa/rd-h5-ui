<!-- by fl -->
<template>
  <div class="fl-calendar-wrapper">

    <div v-show="selectYearShow || selectMonthShow" class="fl-modal" @click="selectCancel"></div>

    <div class="header">
      <div class="year-pre">
        <div v-if="nowYear > minYear" class="block" @click="yearPre">
          <img src="./images/year_pre.png">
        </div>
        <div v-else class="block">
          <img src="./images/year_pre_dis.png">
        </div>
      </div>
      <div class="month-pre">
        <div v-if="nowYear > minYear || nowMonth > 1" class="block" @click="monthPre">
          <img src="./images/month_pre.png">
        </div>
        <div v-else class="block">
          <img src="./images/month_pre_dis.png">
        </div>
      </div>
      <div class="current-time">
        <div class="year" @click="selectYear">{{ nowYear }}年</div>
        <div class="month" @click="selectMonth">{{ nowMonth }}月</div>
      </div>
      <div class="month-next">
        <div v-if="nowYear < maxYear || nowMonth < 12" class="block" @click="monthNext">
          <img src="./images/month_next.png">
        </div>
        <div v-else class="block">
          <img src="./images/month_next_dis.png">
        </div>
      </div>
      <div class="year-next">
        <div v-if="nowYear < maxYear" class="block" @click="yearNext">
          <img src="./images/year_next.png">
        </div>
        <div v-else class="block">
          <img src="./images/year_next_dis.png">
        </div>
      </div>
    </div>

    <div class="body">
      <ul class="week">
        <li v-for="(item, index) in 7">{{ weekStr(index) }}</li>
      </ul>
      <ul class="date">
        <li v-for="(item, index) in dateArray"
            :class="{
            'current': item.date === nowDate && item.whichMonth === 'now',
            'dis': item.whichMonth !== 'now'
            }"
            @click="selectDate(item.date, item.whichMonth)">{{ item.date }}</li>
      </ul>

      <transition name="fade">
        <div v-show="selectYearShow" class="select-wrapper">
          <div class="main">
            <div class="top">
              <div v-if="selectYearStart - minYear >= 10 || selectYearStart - minYear > 0" class="block" @click="selectYearTop">
                <img src="./images/month_pre.png">
              </div>
              <div v-else class="block">
                <img src="./images/month_pre_dis.png">
              </div>
            </div>
            <label>{{ selectYearStart }}&nbsp;-&nbsp;{{ selectYearStart + 9 }}</label>
            <div class="bottom">
              <div v-if="maxYear - selectYearStart >= 10 || maxYear - selectYearStart >= 20" class="block" @click="selectYearBottom">
                <img src="./images/month_next.png">
              </div>
              <div v-else class="block">
                <img src="./images/month_next_dis.png">
              </div>
            </div>
          </div>
          <ul class="content">
            <li v-for="(item, index) in 10"
                :class="{
                'current': selectYearStart + index === nowYear,
                'dis': selectYearStart + index < minYear || selectYearStart + index > maxYear
                }"
                @click="selectYearConfirm(selectYearStart + index)">{{ selectYearStart + index }}</li>
          </ul>
        </div>
      </transition>

      <transition name="fade">
        <div v-show="selectMonthShow" class="select-wrapper">
          <ul class="content">
            <li v-for="(item, index) in 12"
                :class="{
                'current': index + 1 === nowMonth,
                }"
                @click="selectMonthConfirm(index + 1)">{{ index + 1 }}月</li>
          </ul>
        </div>
      </transition>
    </div>

    <Picker v-model="datePickerShow" ref="Picker" :slots="dateSlots" @pickerConfirm="datePickerConfirm"></Picker>

  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from '../Picker/Picker.vue'; // Picker组件

  export default {
    data() {
      return {
        nowYear: new window.Date(this.nowTime).getFullYear(), // 今年
        nowMonth: new window.Date(this.nowTime).getMonth() + 1, // 今月
        nowDate: new window.Date(this.nowTime).getDate(), // 今天
        selectYearStart: 0, // 年份选择阶梯首位
        selectYearShow: false,
        selectMonthShow: false,
        datePickerShow: false,
        dateSlots: [
          { values: [] },
          { divider: true },
          { values: [] }
        ]
      };
    },
    props: {
      minYear: { // 最小可选年份
        type: Number,
        default: new window.Date().getFullYear() - 50
      },
      maxYear: { // 最大可选年份
        type: Number,
        default: new window.Date().getFullYear() + 50
      },
      nowTime: { // 当前时间，时间戳格式
        type: Number,
        default: Date.parse(new window.Date())
      },
      mode: { // 年份、月份选择模式，alert 弹窗形式 picker 下拉选择框模式
        type: String,
        default: 'alert'
      }
    },
    components: { Picker },
    computed: {
      // 计算今月日期
      dateArray() {
        let res = [];
        let week = new window.Date(this.nowYear, this.nowMonth - 1, 1).getDay(); // 星期几
        let preDays = this.daysLength(this.nowMonth - 1 === 0 ? this.nowYear - 1 : this.nowYear, this.nowMonth - 1 === 0 ? 12 : this.nowMonth - 1); // 上月天数
        let nowDays = this.daysLength(this.nowYear, this.nowMonth); // 今月天数
        for (let i = 1; i <= nowDays; i++) { // 填充今月日期
          res.push({
            date: i,
            whichMonth: 'now'
          });
        }
        if (week === 0) {
          week = 7;
        }
        for (let i = 0; i < week; i++) { // 填充上月日期
          res.unshift({
            date: preDays,
            whichMonth: 'pre'
          });
          preDays--;
        }
        let traps = 42 - res.length;
        for (let i = 1; i <= traps; i++) { // 填充下月日期
          res.push({
            date: i,
            whichMonth: 'next'
          });
        }
        return res;
      },
      // 当前星期
      nowWeek() {
        return this.weekStr(new window.Date(this.nowYear, this.nowMonth - 1, this.nowDate).getDay());
      }
    },
    created() {
      this.$emit('select', {
        nowYear: this.nowYear,
        nowMonth: this.nowMonth,
        nowDate: this.nowDate,
        nowWeek: this.nowWeek
      });
    },
    methods: {
      // 星期字符串转换
      weekStr(val) {
        switch (val) {
          case 0:
            return '日';
          case 1:
            return '一';
          case 2:
            return '二';
          case 3:
            return '三';
          case 4:
            return '四';
          case 5:
            return '五';
          case 6:
            return '六';
          default:
            return '';
        }
      },
      // 计算今月有几天
      daysLength(year, month) {
        year = Number(year);
        month = Number(month);
        let isLeapYear = false; // 是否是闰年，true是闰年
        let date = 0; // 日期，28,29,30,31
        let bigMonth = [ 1, 3, 5, 7, 8, 10, 12 ]; // 含有31天的月份
        let smallMonth = [ 4, 6, 9, 11 ]; // 含有30天的月份
        if (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)) { // 判断闰年
          isLeapYear = true;
        }
        if (bigMonth.includes(month)) { // 判断是否是大月
          date = 31;
        } else if (smallMonth.includes(month)) { // 判断是否是小月
          date = 30;
        } else if (month === 2) { // 判断2月是28天还是29天
          date = isLeapYear ? 29 : 28;
        }
        return date;
      },
      // 上一年
      yearPre() {
        if (this.nowYear > this.minYear) {
          this.nowYear--;
        }
      },
      // 上一个月
      monthPre() {
        if (this.nowMonth - 1 === 0) {
          this.nowYear = this.nowYear - 1;
          this.nowMonth = 12;
        } else {
          this.nowMonth--;
        }
      },
      // 下一个月
      monthNext() {
        if (this.nowMonth + 1 === 13) {
          this.nowYear = this.nowYear + 1;
          this.nowMonth = 1;
        } else {
          this.nowMonth++;
        }
      },
      // 下一年
      yearNext() {
        if (this.nowYear < this.maxYear) {
          this.nowYear++;
        }
      },
      // 年月选择取消
      selectCancel() {
        this.selectYearShow = false;
        this.selectMonthShow = false;
      },
      // 选择年份
      selectYear() {
        if (this.mode === 'alert') {
          this.selectYearStart = parseInt(this.nowYear / 10) * 10;
          this.selectYearShow = true;
        } else if (this.mode === 'picker') {
          this._initPickerData();
          this.datePickerShow = true;
        }
      },
      // 选择月份
      selectMonth() {
        if (this.mode === 'alert') {
          this.selectMonthShow = true;
        } else if (this.mode === 'picker') {
          this._initPickerData();
          this.datePickerShow = true;
        }
      },
      // 选择年份-往前筛选
      selectYearTop() {
        this.selectYearStart = this.selectYearStart - 10;
      },
      // 选择年份-往后筛选
      selectYearBottom() {
        this.selectYearStart = this.selectYearStart + 10;
      },
      // 选择年份-选择某一年
      selectYearConfirm(year) {
        if (year >= this.minYear && year <= this.maxYear) {
          this.nowYear = year;
          this.selectCancel();
        }
      },
      // 选择月份-选择某一月
      selectMonthConfirm(month) {
        this.nowMonth = month;
        this.selectCancel();
      },
      // 选择某一天
      selectDate(date, whichMonth) {
        if (whichMonth === 'now') {
          this.nowDate = date;
          this.$emit('select', {
            nowYear: this.nowYear,
            nowMonth: this.nowMonth,
            nowDate: this.nowDate,
            nowWeek: this.nowWeek
          });
        }
      },
      // 初始化picker数据
      _initPickerData() {
        this._initDateYearData(this.minYear, this.maxYear);
        this._initDateMonthData();
        this._initPositionByNowDate(this.nowYear, this.nowMonth);
      },
      // 根据所设置可选时间段极值来初始化可选年份数据，2050年-1950年
      _initDateYearData(start, end) {
        start = Number(start);
        end = Number(end);
        for (var i = start; i <= end; i++) {
          this.dateSlots[0].values.push(i + '年');
        }
      },
      // 初始化可选月份数据，1月-12月
      _initDateMonthData() {
        for (var i = 1; i <= 12; i++) {
          this.dateSlots[2].values.push(i + '月');
        }
      },
      // 默认所选时间为系统当前时间
      _initPositionByNowDate(year, month) {
        for (let i = 0; i < this.dateSlots[0].values.length; i++) {
          if (this.dateSlots[0].values[i] === year + '年') {
            this.dateSlots[0].defaultIndex = i;
            break;
          }
        }
        for (let j = 0; j < this.dateSlots[2].values.length; j++) {
          if (this.dateSlots[2].values[j] === month + '月') {
            this.dateSlots[2].defaultIndex = j;
            break;
          }
        }
        this.$refs.Picker._initCheckWheels();
      },
      // 年份月份确认选择
      datePickerConfirm(pickerText) {
        this.nowYear = Number(pickerText[0].substr(0, pickerText[0].length - 1));
        this.nowMonth = Number(pickerText[1].substr(0, pickerText[1].length - 1));
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Calendar.sass";
</style>
