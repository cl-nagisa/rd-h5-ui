<!-- by fl -->
<template>
  <div class="fl-flow-wrapper"
       :style="{
        'height': height + 'px',
        'background-color': bgColor
        }">
    <div class="level-1"
         :style="{
         'padding-top': top + 'px',
         'padding-bottom': bottom + 'px'
         }">
      <div class="line"
           :style="{
           'width': width + 'px',
           'border-right-width': lineSize + 'px',
           'border-right-style': lineStyle,
           'border-right-color': lineColor
           }"></div>
    </div>
    <div class="level-2">
      <ul v-for="(item, index) in items">
        <li class="time"
            :style="{
            'min-width': timeWidth + 'px',
            'max-width': timeWidth + 'px',
            'font-size': fontSize + 'px',
            'color': timeColor
            }"
            v-html="item.time"></li>
        <li class="point"
            :style="{
            'font-size': fontSize + 'px'
            }">
          <i :style="{
             'width': pointSize + 'px',
             'height': pointSize + 'px',
             'background-color': pointColor
             }"></i>
        </li>
        <li class="text"
            :class="{ 'last-text': index === items.length - 1 }"
            :style="{
            'font-size': fontSize + 'px',
            'color': textColor
            }"
            v-html="item.text"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        height: 0,
        width: 0,
        top: 0,
        bottom: 0
      };
    },
    props: {
      bgColor: { // 整体背景色，默认#fff
        type: String,
        default: '#fff'
      },
      pointColor: { // 连接点颜色，默认#f95e2d
        type: String,
        default: '#f95e2d'
      },
      lineColor: { // 连接线颜色，默认#ddd
        type: String,
        default: '#ddd'
      },
      lineStyle: { // 连接线类型，默认solid
        type: String,
        default: 'solid'
      },
      timeColor: { // 时间列表文字颜色，默认#333
        type: String,
        default: '#333'
      },
      textColor: { // 事件列表文字颜色，默认#333
        type: String,
        default: '#333'
      },
      lineSize: { // 连接线宽度，默认1px
        type: Number,
        default: 1
      },
      pointSize: { // 连接点圆直径大小，默认5px，建议为奇数已确保对齐
        type: Number,
        default: 5
      },
      fontSize: { // 列表文字大小，默认12px
        type: Number,
        default: 12
      },
      timeWidth: { // 时间列表宽度，默认70px
        type: Number,
        default: 70
      },
      items: { // 数据内容
        type: Array
      }
    },
    watch: {
      items(val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            this.cssInit();
          }
        });
      }
    },
    methods: {
      // 初始化样式
      cssInit() {
        this.height = this.$el.querySelector('.level-2').clientHeight;
        this.width = this.$el.querySelector('.level-2 .time').clientWidth + this.$el.querySelector('.level-2 .point').clientWidth / 2;
        this.top = this.$el.querySelector('.level-2 .point').clientHeight / 2 + 5;
        this.bottom = this.$el.querySelector('.level-2 .last-text').clientHeight - this.$el.querySelector('.level-2 .point').clientHeight / 2 + 5;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Flow.sass";
</style>
