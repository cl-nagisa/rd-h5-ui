// by fl
export default {
  data() {
    return {
      nameListSelectValue: '',
      isNameListShow: false,
      nameSlots: []
    };
  },
  methods: {
    _initNameSortData(data) {
      this.nameSlots = data;
    },
    toShowNameList() {
      this.isNameListShow = !this.isNameListShow;
    },
    nameListSelect(value) {
      this.nameListSelectValue = value;
    }
  }
};
