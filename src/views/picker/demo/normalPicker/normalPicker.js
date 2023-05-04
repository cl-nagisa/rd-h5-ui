// by fl
export default {
  data() {
    return {
      isNormalPickerShow: false, // 单项选择器是否显示，true显示
      normalSlots: [
        {
          values: [ '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日' ]
        }
      ]
    };
  },
  methods: {
    // 显示/关闭单项选择器
    toShowNormalPicker() {
      this.isNormalPickerShow = !this.isNormalPickerShow;
    }
  }
};
