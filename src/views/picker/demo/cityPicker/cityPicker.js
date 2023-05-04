// by fl
export default {
  data() {
    return {
      zoneFirst: '',  // 一级地域列表（省份）
      zoneSecond: '', // 二级地域列表(城市)
      cityAdressSelect: '', // 实时所选结果
      cityAdressConfirm: '', // 确认所选结果
      isCityPickerShow: false, // 城市选择器是否显示，true显示
      citySlots: [
        { values: '' },
        { divider: true, content: '-' },
        { values: '' },
        { divider: true, content: '-' },
        { values: '' }
      ]
    };
  },
  methods: {
    // 读取本地接口数据，默认选择数据的首项，即“北京市-西城区”
    _initCityData() {
      this.$http.get('/api/dataJson').then((res) => {
        this.zoneFirst = res.data.data.areaJson.zoneFirst;
        this.zoneSecond = res.data.data.areaJson.zoneSecond;
        this.citySlots[0].values = Object.keys(this.zoneFirst);
      });
    },
    // 显示/关闭城市选择器
    toShowCityPicker() {
      this.isCityPickerShow = !this.isCityPickerShow;
    },
    // 从picker组件中监听到change事件，变换所选数据
    cityPickerChange(picker, pickerValue) {
      if (pickerValue[0].value) {
        picker.setSlotValues(2, this.zoneFirst[pickerValue[0].value]);
        picker.setSlotValues(4, this.zoneSecond[this.citySlots[2].values[0]]);
      } else if (pickerValue[1].value) {
        picker.setSlotValues(4, this.zoneSecond[pickerValue[1].value]);
      }
    },
    // 从picker组件中监听到pickerText事件，记录当前实时选择的数据结果
    getCityPickerText(pickerText) {
      this.cityAdressSelect = '';
      for (var i = 0; i < pickerText.length; i++) {
        this.cityAdressSelect = this.cityAdressSelect + ' ' + pickerText[i];
      }
    },
    // 从picker组件中监听到pickerConfirm事件，确认并记录当前所选择的结果
    cityPickerConfirm() {
      this.cityAdressConfirm = this.cityAdressSelect;
    }
  }
};
