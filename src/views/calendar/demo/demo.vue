<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <calendar :minYear="1990" :maxYear="2030" :mode="mode" @select="select"></calendar>
      <label>当前所选时间：{{ selectTime.nowYear }}年{{ selectTime.nowMonth }}月{{ selectTime.nowDate }}日星期{{ selectTime.nowWeek }}</label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Calendar from '../../../components/Calendar/Calendar.vue';

  export default {
    data() {
      return {
        mode: 'alert',
        selectTime: ''
      };
    },
    components: { Calendar },
    methods: {
      select(obj) {
        this.selectTime = obj;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
