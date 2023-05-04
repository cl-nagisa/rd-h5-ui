<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>圆形进度条-带渐变色</label>
      <circular-progress class='progress'
                         :value="textVal"
                         :radius='60'
                         :borderWidth="10"
                         isGradient
                         :gradientArray="gradientArray"
                         :textSize="18"></circular-progress>
      <input class="range" type="range" min="0" max="100" v-model="rangeVal">
    </div>
    <div class="demo">
      <label>圆形进度条-自定义文字</label>
      <circular-progress class='progress' :value="100" bgColor="#fff" text="已满标"></circular-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CircularProgress from '../../../components/CircularProgress/CircularProgress.vue'; // 引入圆形进度圈组件

  export default {
    data() {
      return {
        rangeVal: 50,
        gradientArray: [
          { offset: 0, color: '#57e5df' },
          { offset: 50, color: '#F37E33' },
          { offset: 100, color: '#3fc4ea' }
        ]
      };
    },
    computed: {
      textVal() {
        return parseInt(this.rangeVal);
      }
    },
    components: { CircularProgress }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
