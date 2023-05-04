<!-- by fl -->
<template>
  <div class="page">
    <ul class="menu">
      <li @click="toShowNormalPicker">单项选择器</li>
      <li @click="toShowTimePicker">时间选择器</li>
      <li @click="toShowDatePicker">日期选择器</li>
      <label>实时日期：{{ dateSelect }}</label>
      <label>确认日期：{{ dateConfirm }}</label>
      <li @click="toShowCityPicker">城市选择器</li>
      <label>实时地址：{{ cityAdressSelect }}</label>
      <label>确认地址：{{ cityAdressConfirm }}</label>
    </ul>
    <Picker v-model="isNormalPickerShow" ref="normalPicker"
            title="请选择"
            :slots="normalSlots">
    </Picker>
    <Picker v-model="isTimePickerShow" ref="timePicker"
            :slots="timeSlots"
            isOnScrollChange
            @change="timePickerChange">
    </Picker>
    <Picker v-model="isDatePickerShow" ref="datePicker"
            :slots="dateSlots"
            @change="datePickerChange"
            @pickerText="getDatePickerText"
            @pickerConfirm="datePickerConfirm">
    </Picker>
    <Picker v-model="isCityPickerShow" ref="cityPicker"
            :slots="citySlots"
            isOnScrollChange
            rememberPosition
            @change="cityPickerChange"
            @pickerText="getCityPickerText"
            @pickerConfirm="cityPickerConfirm">
    </Picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import normalPicker from './normalPicker/normalPicker.js'; // 单项选择器
  import timePicker from './timePicker/timePicker.js'; // 时间选择器
  import datePicker from './datePicker/datePicker.js'; // 日期选择器
  import cityPicker from './cityPicker/cityPicker.js'; // 城市选择器
  import Picker from '../../../components/Picker/Picker.vue'; // Picker组件

  export default {
    mixins: [ normalPicker, timePicker, datePicker, cityPicker ],
    components: { Picker },
    created() {
      this._initTimeData(); // 初始化时间选择器数据
      this._initDateData(); // 初始化日期选择器数据
      this._initCityData(); // 初始化城市选择器数据
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
