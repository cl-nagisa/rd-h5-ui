// by fl
export default {
  data() {
    return {
      postListSelectValue: '',
      isPostListShow: false,
      postSlots: []
    };
  },
  methods: {
    _initPostSortData(data) {
      let key = Object.keys(data);
      let i, j;
      for (i = 0; i < key.length; i++) {
        this.postSlots[i] = {};
        this.postSlots[i].name = key[i];
        if (data[key[i]].length > 0) {
          this.postSlots[i].items = [];
          for (j = 0; j < data[key[i]].length; j++) {
            this.postSlots[i].items.push(data[key[i]][j]);
          }
        }
      }
    },
    toShowPostList() {
      this.isPostListShow = !this.isPostListShow;
    },
    postListSelect(value) {
      this.postListSelectValue = value;
    }
  }
};
