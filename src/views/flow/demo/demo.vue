<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <flow :items="flowData"></flow>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Flow from '../../../components/Flow/Flow.vue';

  export default {
    data() {
      return {
        flowData: []
      };
    },
    components: { Flow },
    created() {
      this._initData();
    },
    methods: {
      _initData() {
        this.$http.get('/api/dataJson').then((res) => {
          this.flowData = res.data.data.flowData;
        });
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
