<!-- by fl -->
<template>
  <div>
    <div class="fl-bar-wrapper" ref="wrapper">
      <div v-if="label" class="label"
           :style="{
           'width': labelWidth > 0 ? labelWidth + 'px' : 'auto',
           'font-size': labelSize + 'px',
           'color': labelColor
           }"
           v-html="label"></div>
      <div class="bar-outside"
           :style="{
           'height': height + 'px',
           'background-color': bgColor
           }">
        <div class="bar-inside"
             :style="{
             'width': value + '%',
             'background-color': fgColor
             }"></div>
      </div>
      <div v-if="isValueShow" class="value"
           :style="{
           'width': valueWidth > 0 ? valueWidth + 'px' : 'auto',
           'font-size': unitSize + 'px',
           'color': unitColor
           }">{{ value }}{{ unit }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: { // 进度值，默认0
        type: Number,
        default: 0
      },
      height: { // 进度条高度，单位px，默认10px
        type: Number,
        default: 10
      },
      labelWidth: { // 进度条左侧提示文案长度，默认不限制，auto
        type: Number,
        default: -1
      },
      valueWidth: { // 进度条右侧文字长度，默认不限制，auto
        type: Number,
        default: -1
      },
      unit: { // 进度条右侧数值单位文案，默认空
        type: String,
        default: ''
      },
      unitSize: { // 进度条右侧文字字号，默认14px
        type: Number,
        default: 14
      },
      unitColor: { // 进度条右侧文字颜色，默认#333
        type: String,
        default: '#333'
      },
      label: { // 进度条左侧提示文案，支持html文本，默认空
        type: String,
        default: ''
      },
      labelSize: { // 进度条左侧文字字号，默认14px
        type: Number,
        default: 14
      },
      labelColor: { // 进度条左侧文字颜色，默认#333
        type: String,
        default: '#333'
      },
      bgColor: { // 进度条背景色，默认#eee
        type: String,
        default: '#eee'
      },
      fgColor: { // 进度条前景色，默认#ffcc1c
        type: String,
        default: '#ffcc1c'
      },
      isValueShow: { // 是否显示进度条右侧进度值及单位，默认false不显示
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "ProgressBar.sass";
</style>
