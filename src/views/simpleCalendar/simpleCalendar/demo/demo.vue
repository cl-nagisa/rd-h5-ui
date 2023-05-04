<template lang="html">
  <div class="">
    <calendar
      :StartYear = 'StartYear'
      :EndYear = 'EndYear'
      :isSupportTimeStamp = 'isSupportTimeStamp'
      :isSupportFeatureDay = 'isSupportFeatureDay'
      :isSupportRemark = 'isSupportRemark'
      :FailData = 'FailData'
      :SuccessData = 'SuccessData'
      :remark = 'remark'
      @getValue = 'getValue'
      ></calendar>
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
      FailData: [], //  特殊日期数据
      SuccessData: [], //  特殊日期数据
      remark: [] // 备注的数据
    };
  },
  created() {
    this.dateInformation();
    this.remarkInformation();
  },
  methods: {
    getValue(val) {
      // 重新获取备注数据
      console.log(val);
      // this.remarkInformation() {
      //   this.$http.post('/api').then((res) => {
      //     this.remark = res.data.remark;
      //   });
      // }
    },
    dateInformation() {
      this.FailData = data.Fail;
      this.SuccessData = data.Success;
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
