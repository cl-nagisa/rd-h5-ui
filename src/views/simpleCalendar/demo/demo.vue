<template lang="html">
  <div class="">
    <calendar
      :StartYear = 'StartYear'
      :EndYear = 'EndYear'
      :isSupportTimeStamp = 'isSupportTimeStamp'
      :isSupportFeatureDay = 'isSupportFeatureDay'
      :isSupportRemark = 'isSupportRemark'
      :FeatureDay = 'FeatureDay'
      :remark = 'remark'
      @getValue = 'getValue'
      @getRemark = 'getRemark'
      ></calendar>
    <p>{{year}}年-{{month}}月-{{day}}日-星期{{weekDay}}</p>
  </div>
</template>

<script>
import calendar from '../../../components/simpleCalendar/simpleCalendar.vue';
import * as data from './data.js';
export default {
  components: {
    calendar
  },
  data() {
    return {
      StartYear: 1900, // 最低年份
      EndYear: 2040, // 最高年份
      isSupportFeatureDay: true, // 是否支持特殊日期功能
      isSupportRemark: true, // 是否支持备注功能
      isSupportTimeStamp: false, //  传的日期是否为时间戳
      FeatureDay: [], //  特殊日期数据
      remark: [], // 备注的数据
      year: '',
      month: '',
      day: '',
      weekDay: ''
    };
  },
  created() {
    this.dateInformation();
    this.remarkInformation();
  },
  methods: {
    getValue (year, month, day, weekDay) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.weekDay = weekDay;
    },
    getRemark(val) {
      // 重新获取备注数据
      console.log(val);
      // this.getValue() {
      //   this.$http.post('/api').then((res) => {
      //     this.remark = res.data.remark;
      //   });
      // }
    },
    dateInformation() {
      this.FeatureDay = data.FeatureDay;
    },
    // 或者
    // dateInformation() {
    //   this.$http.get('/api').then((res) => {
    //     this.FailData = res.data.Fail;
    //     this.SuccessData = res.data.Success;
    //   });
    // }
    remarkInformation() {
      this.remark = data.remark;
    }
    // 或者
    // remarkInformation() {
    //   this.$http.get('/api').then((res) => {
    //     this.remark = res.data.remark;
    //   });
    // },
  }
};
</script>

<style lang="css">
</style>
