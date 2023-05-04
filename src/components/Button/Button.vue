<!-- by fl -->
<template>
  <div class="fl-button-wrapper"
       :class="{ 'disable': disable, 'loading': loading }"
       :style="{
       'width': width + '%',
       'height': height + 'px',
       'line-height': height + 'px',
       'background-color': bgColor,
       'border-radius': radius + 'px'
        }"
        @click="onClick">
    <label :style="{ 'font-size': textSize + 'px' }">{{ loading ? loadingText : text }}</label>
    <div v-if="loading" class="loading">
      <div class="k-line k-line11-1"></div>
      <div class="k-line k-line11-2"></div>
      <div class="k-line k-line11-2"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    props: {
      width: { // 按钮宽度，单位百分比，默认90%
        type: Number,
        default: 90
      },
      height: { // 按钮高度，单位px，默认36px
        type: Number,
        default: 36
      },
      radius: { // 按钮圆角弧度，单位px，默认4px
        type: Number,
        default: 4
      },
      textSize: { // 按钮文案字体大小，默认16px
        type: Number,
        default: 16
      },
      bgColor: { // 按钮背景色，默认#f95a28
        type: String,
        default: ''
      },
      text: { // 按钮文案，默认空
        type: String,
        default: '确认'
      },
      loadingText: { // 按钮提交时文案，默认‘提交中’
        type: String,
        default: '提交中'
      },
      disable: { // 按钮是否禁止点击，true禁止点击并置灰，默认false
        type: Boolean,
        default: false
      },
      loading: { // 按钮是否点击后显示loading动画，true显示，默认false
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick() {
        if (this.disable || this.loading) {
          return false;
        } else {
          this.$emit('click', this);
        }
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Button.sass";
</style>
