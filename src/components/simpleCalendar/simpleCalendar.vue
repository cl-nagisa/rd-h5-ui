<template>
  <div class="calendarBox">
    <div class="maskLayer" v-show="isShowMask" @click="HideChoose">
    </div>
    <!-- 选择年份 -->
    <transition name='slide'>
      <div class="chooseLayer" v-show="isShowChoose" ref='chooseLayer'>
        <div class="confirmButton">
          <span @click="HideChoose">取消</span>
          <span @click="updateDate">确定</span>
        </div>
        <div class="chooseLayerContent" ref='layer'>
          <ul ref='layerBox' class="wheel-scroll">
            <li v-for='(item,index) in yearDate' ref='layerData'
                :class="{'wheel-item': true, 'selectedYear':index === selectYearData - StartYear}"
                @click='setYearData(item)'>
              {{item}}
            </li>
          </ul>
          <div class="selected">
          </div>
        </div>
      </div>
    </transition>
    <!-- 保存提交备注 -->
    <transition name='slide'>
      <div class="remark" v-if='isOpenRemark'>
        <div class="remark_box">
          <span @click="Hideremark">取消</span>
          <span @click="updateremark">保存</span>
          <p>{{yearNum}} - {{monthNum + 1}} - {{dateNum}}</p>
          <textarea name="name" rows="8" cols="80" ref='remarkTextarea' v-model='remarkText'></textarea>
        </div>
      </div>
    </transition>
    <div class="yearMonth">
      <!-- 年份 -->
      <div class="yearTime" @click="openSearchYear">
        <span>{{yearNum}}</span>
        <!-- 右小三角 -->
        <div class="openSearchYear">
        </div>
      </div>
      <!-- 月份 -->
      <div class="monthTime" ref="tab">
        <ul ref="tabcontent">
          <li v-for="(item,index) in 12" ref="tabitem" :gameinfo='item' @click="searchMonth(index)"
              :class="{selectedMonth:index===monthNum}">
            <p>{{item+'月'}}</p>
          </li>
        </ul>
      </div>
      <div class="clear">
      </div>
    </div>
    <!-- 星期 -->
    <div class="weekBox">
      <ul>
        <li v-for='item in weekList'>{{item}}</li>
      </ul>
    </div>
    <!-- 日期 -->
      <div class="dataMoveBox" ref="dataMoveBox">
        <div class="dataMove" ref="dataMove">
          <div v-for='item in 2' :class="{'dataBox':true}" ref='dataBox'>
               <!--@touchstart='swipeMoveStart' @touchend='swipeMoveEnd'-->
            <ul ref="dateTeam">
              <!-- 上个月日期在本月的显示 -->
              <li v-for='(item,index) in prevMonthDayList'>
                <p class='fontColor'><a>{{item}}</a></p>
                <span v-if="false"></span>
              </li>
              <!-- 本月日期的显示 -->
              <li v-for='(item,index) in nowMonthDayList' ref='nowDate' @click='setDateData(index,monthNum,yearNum)'
                  :key='index'>
                <p :class="{
                isToday:isToday && index + 1 ===todayDate,
                selectedDate:isSelectedDate && index === dateNum - 1 || isFristDay && index === 0}">
                  <a>{{item}}</a>
                  <b v-for='item in remarkSelected' v-if='index + 1 === item'></b>
                </p>
                <span></span>
              </li>
              <!-- 下个月日期在本月的显示 -->
              <li v-for='item in nextMonthDayList'>
                <p class='fontColor'><a>{{item}}</a></p>
                <span v-if="false"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        isFristDay: false, // 是否是本月第一天
        yearDate: [], // 所有可以选择的年份
        yearNum: 2016, //  选择的年份,显示数字与当年相等
        monthNum: 1, //  选择的月份,显示数字比当月小1
        dateNum: 3, //  选择的日期,显示数字与当天相等
        todayYear: 2018, //  今天的年份
        todayMonth: 1, //  今天的月份
        weekList: ['日', '一', '二', '三', '四', '五', '六'],
        weekDay: 1, //  周几
        monthDaySum: [], //  记录月份天数
        prevMonthDayList: [], //  上个月在本月显示的日期
        nowMonthDayList: [], // 本月的显示日期
        nextMonthDayList: [], // 下个月在本月的显示日期
        startX: 1, //  手指触摸屏幕的X位置
        startY: 1, //  手指触摸屏幕的Y位置
        endX: 1, //  手指离开屏幕的X位置
        endY: 1, //  手指离开屏幕的Y位置
        isShowChoose: false, // 是否开启选择层
        isShowMask: false, //  是否开启遮罩层
        selectYearData: 2018, // 下拉选择器选择的年份
        // selectMonthData: 0, //  下拉选择器选择的月份
        selectDateData: 0, //  下拉选择器选择的日期
        yearL: 0, //  保存设置的year的值
        monthL: 0, //  保存设置的month的值
        remarkText: '', //  备注的信息
        isOpenRemark: false, // 是否打开备注
        remarkSelected: [], // 每个月含有备注的日期集合
        timestampD: 1, // 时间戳的日期
        timestampM: 1, // 时间戳的月份
        timestampY: 1, // 时间戳的年份
        startXzhou: []
      };
    },
    props: {
      //  传入的日期是否为时间戳
      isSupportTimeStamp: {
        type: Boolean,
        default: true
      },
      // 是否支持显示特殊日期
      isSupportFeatureDay: {
        type: Boolean,
        default: true
      },
      // 是否支持备注
      isSupportRemark: {
        type: Boolean,
        default: true
      },
      FeatureDay: {
        type: Array,
        default: function () {
          return [];
        }
      },
      StartYear: {
        type: Number,
        default: 1950
      },
      EndYear: {
        type: Number,
        default: 2030
      },
      remark: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    watch: {
      yearNum: function () {
        this.change();
      },
      monthNum: function () {
        this.change();
        if (this.todayMonth !== this.monthNum) {
          this.dateNum = 1;
        }
        this.startXzhou = [];
      },
      dateNum: function (val, oldval) {
        if (this.dateNum === 1 && this.monthNum !== this.todayMonth) {
          this.isFristDay = true;
        } else {
          this.isFristDay = false;
        }
        this.weekJudge(this.dateNum);
      }
    },
    computed: {
      isToday: function () {
        if (this.todayYear === this.yearNum && this.todayMonth === this.monthNum) {
          return true;
        } else {
          return false;
        }
      },
      isSelectedDate: function () {
        if (this.yearL === this.yearNum && this.monthL === this.monthNum) {
          return true;
        } else {
          return false;
        }
      }
    },
    created() {
        this.TodayDate();
        this.isLeapYear();
        this.isEachMonthFirstDay();
        this.setAllYearTime();
        this.DataFeatureBack();
        this.remarkScan();
    },
    mounted() {
      this.InitChooseScroll();
      this.InitDateScroll();
    },
    methods: {
      change() {
        this.DateInitialize();
        this.isEachMonthFirstDay();
        this.InitTabScroll();
        this.clearDataFeatureBack();
        this.DataFeatureBack();
        this.clearRemarkScan();
        this.remarkScan();
      },
      // 月份日期初始化
      DateInitialize() {
        this.prevMonthDayList = [];
        this.nowMonthDayList = [];
        this.nextMonthDayList = [];
      },
      // 月份滚动
      InitTabScroll() {
        let width = 12 * 70;
        this.$refs.tabcontent.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tab, {
              startX: 0, // 横轴方向初始化位置。
              click: true, //  阻止浏览器的原生 click 事件
              scrollX: true, //  当设置为 true 的时候，可以开启横向滚动
              scrollY: false, // 当设置为 true 的时候，可以开启纵向滚动
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
          }
          this.scroll.scrollToElement(this.$refs.tabitem[this.monthNum]);
        });
      },
      // 选择年份滚动
      InitChooseScroll() {
        this.$nextTick(() => {
          if (!this.scrollYear) {
            this.scrollYear = new BScroll(this.$refs.layer, {
              wheel: {
                selectedIndex: 0,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item',
                adjustTime: 400,
                rotate: 0
              },
              bounce: true,
              probeType: 2
            });
            this.scrollYear.on('scrollEnd', () => {
              let index = this.scrollYear.getSelectedIndex();
              this.scrollYear.wheelTo(index);
              this.selectYearData = index + this.StartYear;
            });
          } else {
            this.scrollYear.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
          }
        });
      },
      // 选择日期滚动
      InitDateScroll() {
        let width = this.$refs.dataMoveBox.offsetWidth * 4;
        this.$refs.dataMove.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.scrollDate) {
            this.scrollDate = new BScroll(this.$refs.dataMoveBox, {
              startX: 0, // 横轴方向初始化位置。
              click: true, //  阻止浏览器的原生 click 事件
              scrollX: true, //  当设置为 true 的时候，可以开启横向滚动
              scrollY: false, // 当设置为 true 的时候，可以开启纵向滚动
              eventPassthrough: 'vertical',
              momentum: false,
              snap: {
                loop: true,
                threshold: 0.3,
                speed: 0
              }, // 循环
              probeType: 2
            });
            this.scrollDate.on('scroll', (x) => {
              this.startXzhou.push(x);
            });
            this.scrollDate.on('scrollEnd', (pageX) => {
              let subtract = pageX.x - this.startXzhou[0].x;
              // 当向右滑或向下滑，转向上一月
              if (subtract > 300) {
                if (this.monthNum === 0) {
                  this.yearNum = this.yearNum - 1;
                  this.monthNum = 11;
                } else {
                  this.monthNum -= 1;
                }
                // 当向左滑或向上滑，转向下一月
              } else if (subtract < -300) {
                if (this.monthNum === 11) {
                  this.yearNum = this.yearNum + 1;
                  this.monthNum = 0;
                } else {
                  this.monthNum += 1;
                }
              }
            });
          } else {
            this.scrollDate.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
          }
        });
      },
      // 获取当天日期
      TodayDate() {
        let Today = new Date();
        this.todayYear = Today.getFullYear();
        this.todayMonth = Today.getMonth();
        this.todayDate = Today.getDate();
        this.yearNum = this.todayYear;
        this.monthNum = this.todayMonth;
        this.dateNum = this.todayDate;
      },
      // 检验每月1号为星期几
      isEachMonthFirstDay() {
        this.weekJudge(1);
        //  上个月的日期
        if (this.weekDay === 0) {
          this.weekDay = 7;
        }
        for (let i = 0; i < this.weekDay; i++) {
          // 如果选择的是一月份
          if (this.monthNum === 0) {
            this.prevMonthDayList.unshift(31 - i);
          } else {
            this.prevMonthDayList.unshift(this.monthDaySum[this.monthNum - 1] - i);
          }
        }
        //  本月的日期
        for (let j = 0; j < this.monthDaySum[this.monthNum]; j++) {
          this.nowMonthDayList.push(j + 1);
        }
        //  下个月的日期
        var dataLength = this.nowMonthDayList.length + this.prevMonthDayList.length;
        for (let k = 0; k < 42 - dataLength; k++) {
          this.nextMonthDayList.push(k + 1);
        }
      },
      // 判断是周几
      weekJudge(day) {
        var FirstDay = new Date();
        FirstDay.setYear(this.yearNum);
        FirstDay.setMonth(this.monthNum);
        FirstDay.setDate(day);
        this.weekDay = FirstDay.getDay();
      },
      // 判断是否为闰年
      isLeapYear() {
        if (this.yearNum % 4 === 0 && this.yearNum % 100 !== 0 || this.yearNum % 400 === 0) {
          this.monthDaySum = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          this.monthDaySum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
      },
      // 选择月份（导航）
      searchMonth(index) {
        this.monthNum = index;
      },
      // 所有年份
      setAllYearTime() {
        for (var i = this.StartYear; i <= this.EndYear; i++) {
          this.yearDate.push(i);
        }
      },
      // 选择年份月份界面
      openSearchYear() {
        this.isShowChoose = true;
        this.isShowMask = true;
      },
      // 确定年份月份
      updateDate() {
        this.yearNum = this.selectYearData;
        // this.monthNum = this.selectMonthData;
        this.dateNum = this.selectDateData || 1;
        this.isShowMask = false;
        this.isShowChoose = false;
      },
      // 设置年份
      setYearData(val) {
        this.selectYearData = val;
      },
      // 设置日期
      setDateData(index, month, year) {
        this.yearL = year;
        this.monthL = month;
        this.dateNum = index + 1;
        this.weekJudge(index + 1);
        this.$emit('getValue', year, month, index + 1, this.weekList[this.weekDay]);
        if (this.isSupportRemark) {
          this.isOpenRemark = true;
          this.isShowMask = true;
          this.remarkText = '';
          for (let i = 0; i < this.remark.length; i++) {
            if (this.remark[i].dateAssign === index + 1 && month + 1 === this.remark[i].monthAssign && year === this.remark[i].yearAssign) {
              this.remarkText = this.remark[i].remarkText;
            }
          }
        }
      },
      // 清除特殊日期样式
      clearDataFeatureBack() {
        this.$nextTick(() => {
          let dateli = this.$refs.nowDate;
          for (let i = 0; i < dateli.length; i++) {
            dateli[i].children[0].style.border = '0px';
            dateli[i].children[1].innerHTML = '';
          }
        });
      },
      // 设置特殊日期样式
      DataFeatureBack() {
        if (this.isSupportFeatureDay) {
          this.$nextTick(() => {
            let dateli = this.$refs.nowDate;
            let length = dateli.length;
            for (let i = 0; i < this.FeatureDay.length; i++) {
              if (this.isSupportTimeStamp) {
                this.timestamp(this.FeatureDay[i].timestamp);
                this.FeatureDay[i].dateAssign = this.timestampD;
                this.FeatureDay[i].monthAssign = this.timestampM;
                this.FeatureDay[i].yearAssign = this.timestampY;
              }
              for (let j = 0; j < length; j++) {
                //  标识的特殊日期样式
                if (this.FeatureDay[i].dateAssign === j && this.monthNum + 1 === this.FeatureDay[i].monthAssign && this.yearNum === this.FeatureDay[i].yearAssign) {
                  dateli[j - 1].children[0].style.border = '1px solid rgb(203, 53, 53)';
                  dateli[j - 1].children[1].innerHTML = this.FeatureDay[i].daySign === undefined ? '' : this.FeatureDay[i].daySign;
                }
              }
            }
          });
        }
      },
      // 关闭遮罩层和选择层
      HideChoose() {
        this.isShowChoose = false;
        this.isShowMask = false;
        this.Hideremark();
      },
      // 遍历出有备注的日期
      remarkScan() {
        if (this.isSupportRemark) {
          this.$nextTick(() => {
            // 传入的是否是时间戳
            if (this.isSupportTimeStamp) {
              for (let i = 0; i < this.remark.length; i++) {
                this.timestamp(this.remark[i].timestamp);
                this.remark[i].dateAssign = this.timestampD;
                this.remark[i].monthAssign = this.timestampM;
                this.remark[i].yearAssign = this.timestampY;
              }
            }
            let dateli = this.$refs.nowDate;
            let length = dateli.length;
            for (let i = 0; i < this.remark.length; i++) {
              for (let j = 0; j < length; j++) {
                if (this.remark[i].dateAssign === j && this.monthNum + 1 === this.remark[i].monthAssign && this.yearNum === this.remark[i].yearAssign) {
                  this.remarkSelected.push(j);
                }
              }
            }
          });
        }
      },
      // 备注信息清理
      clearRemarkScan() {
        this.remarkSelected = [];
      },
      // 关闭备注
      Hideremark() {
        this.isOpenRemark = false;
        this.isShowMask = false;
      },
      // 向父组件传递数据
      updateremark() {
        let fromData = [this.yearNum, this.monthNum + 1, this.dateNum, this.remarkText];
        this.$emit('getRemark', fromData);
      },
      // 时间戳转化
      timestamp(TimeStamp) {
        let date = new Date(TimeStamp * 1000); // 如果date为13位不需要乘1000
        this.timestampY = parseInt(date.getFullYear());
        this.timestampM = parseInt((date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1));
        this.timestampD = parseInt((date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()));
      }
    }
  };
</script>
<style lang="sass" scoped>
  @import "simpleCalendar.sass"
</style>
