<!-- by fl -->
<template>
  <scrolling-canvas ref="scrolling" class="page" :height="clientHeight" :isAllLoad="isAllLoad" @finishDown="refresh" @finishUp="loadMore">
    <ul class="demo">
      <li v-for="(item, index) in data">{{ item }}</li>
    </ul>
  </scrolling-canvas>
</template>

<script type="text/ecmascript-6">
  import ScrollingCanvas from '../../../components/ScrollingCanvas/ScrollingCanvas.vue';

  export default {
    data() {
      return {
        clientHeight: document.documentElement.clientHeight,
        isAllLoad: false,
        data: []
      };
    },
    components: { ScrollingCanvas },
    created() {
      this._initData();
    },
    mounted() {
      window.onresize = () => {
        this.clientHeight = document.documentElement.clientHeight;
      };
    },
    methods: {
      // 读取本地接口数据
      _initData(type) {
        this.$http.get('/api/dataJson').then((res) => {
          if (!this.isAllLoad) {
            this.data = this.data.concat(res.data.data.byName.slice(0, 5));
          }
          if (this.data.length >= 15) {
            this.isAllLoad = true;
          }
        });
      },
      refresh() {
        this.data = [];
        this.isAllLoad = false;
        this._initData('refresh');
      },
      loadMore() {
        this._initData('loadMore');
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
