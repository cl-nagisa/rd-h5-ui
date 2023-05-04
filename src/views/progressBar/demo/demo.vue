<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>类型一</label>
      <progress-bar class="progress" :value="value"></progress-bar>
    </div>
    <div class="demo">
      <label>类型二</label>
      <progress-bar class="progress" :value="value" fgColor="#333" isValueShow unit="%"></progress-bar>
    </div>
    <div class="demo">
      <label>类型三</label>
      <progress-bar class="progress" :value="value" label="价格" isValueShow unit="元"></progress-bar>
    </div>
    <input class="range" type="range" min="0" max="100" v-model="rangeVal">
  </div>
</template>

<script type="text/ecmascript-6">
  import ProgressBar from '../../../components/ProgressBar/ProgressBar.vue';

  export default {
    data() {
      return {
        rangeVal: 50
      };
    },
    computed: {
      value() {
        return parseInt(this.rangeVal);
      }
    },
    components: { ProgressBar }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
