<!-- by fl -->
<template>
  <div class="fl-progress-wrapper" :style="{ 'width': boxSize + 'px', 'height': boxSize + 'px' }">
    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs v-if="isGradient">
        <linearGradient id="gradient_color"
                        x1="0%"
                        :x2="gradientModel === 'vertical' ? '100%' : '0%'"
                        y1="0%"
                        :y2="gradientModel === 'horizontal' ? '100%' : '0%'">
          <stop v-for="(item, index) in gradientArray"
                :key="index"
                :offset="item.offset + '%'"
                :stop-color="item.color"></stop>
        </linearGradient>
      </defs>
      <circle
        :cx="origin"
        :cy="origin"
        :r="radius"
        :stroke-width="borderWidth"
        :stroke="borderBgColor"
        fill="none"></circle>
      <circle
        :cx="origin"
        :cy="origin"
        :r="radius"
        :stroke-width="borderWidth"
        :stroke="isGradient ? 'url(#gradient_color)' : borderFgColor"
        :fill="bgColor"
        :transform="'matrix(0, -1, 1 ,0, 0, ' + boxSize + ')'"
        :stroke-dasharray="dasharray"></circle>
    </svg>
    <div class="center-text"
         :style="{ 'font-size': textSize + 'px', 'color': textColor }"
         v-html="text ? text : value + '%'"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        dasharray: this.dasharrayComputed(0)
      };
    },
    props: {
      value: { // 进度值，默认0
        type: Number,
        default: 0
      },
      radius: { // 半径，默认30
        type: Number,
        default: 30
      },
      borderWidth: { // 边宽，默认3
        type: Number,
        default: 3
      },
      textSize: { // 圆心文案字体大小，默认12px
        type: Number,
        default: 12
      },
      text: { // 圆心文案内容，支持html内容
        type: String,
        default: ''
      },
      textColor: { // 圆心文案颜色，默认#333
        type: String,
        default: '#333'
      },
      bgColor: { // 圆内背景色，默认无色
        type: String,
        default: 'none'
      },
      borderBgColor: { // 边宽背景色，默认#eee
        type: String,
        default: '#eee'
      },
      borderFgColor: { // 宽边前景色，默认#f95a28
        type: String,
        default: '#f95a28'
      },
      gradientModel: { // 渐变模式，vertical垂直渐变，horizontal水平模式，默认垂直渐变
        type: String,
        default: 'vertical'
      },
      isGradient: { // 是否开启渐变模式，默认false不开启
        type: Boolean,
        default: false
      },
      gradientArray: { // 渐变颜色数组，子项有offset渐变进度，color渐变颜色
        type: Array
      }
    },
    computed: {
      // 根据当前半径，计算图形容器的大小，即宽高
      boxSize() {
        return this.radius * 2 + this.borderWidth;
      },
      // 根据当前容器大小，计算圆心所在坐标位置
      origin() {
        return this.boxSize / 2;
      }
    },
    watch: {
      value(val) {
        this.dasharray = this.dasharrayComputed(val);
      }
    },
    mounted() {
      setTimeout(() => {
        this.dasharray = this.dasharrayComputed(this.value);
      }, 200);
    },
    methods: {
      // 根据当前进度值，计算stroke-dasharray属性所需要的值
      dasharrayComputed(val) {
        let percent = val / 100;
        let perimeter = Math.PI * 2 * this.radius;
        return perimeter * percent + ' ' + perimeter * (1 - percent);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "CircularProgress.sass";
</style>
