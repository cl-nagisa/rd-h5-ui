<!-- by fl -->
<template>
  <div class="fl-input-wrapper" v-clickOutside="doCloseActive" @click="clicked">
    <template v-if="img">
      <img class="input-icon" :src="img">
    </template>
    <div v-if="label" class="input-label">
      <label>{{ label }}</label>
    </div>
    <div class="input-placeholder" :style="{ 'text-align': singleLine ? 'center' : '' }">
      <input
        ref="input"
        v-model="currentValue"
        :class="{ 'readonly': readonly }"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :regularName="regularName"
        :style="{ 'width': singleLine ? '50%' : '', 'line-height': inputLineHeight, 'text-align': align }"
        @focus="doFocus"
        @input="handleInput"
        autocomplete="new-password">
    </div>
    <template v-if="switchEye && showEye">
      <img v-show="!eyeOpen" class="icon icon-eye" src="./images/hide_pwd.png" :class="{ 'absolute': singleLine }" @click="eyeOpen = !eyeOpen">
      <img v-show="eyeOpen" class="icon icon-eye" src="./images/show_pwd.png" :class="{ 'absolute': singleLine }" @click="eyeOpen = !eyeOpen">
    </template>
    <template v-if="disableClear || readonly">
      <img v-show="currentValue && active" class="icon icon-delate" src="./images/delate.png" :class="{ 'absolute': singleLine }" @click="handleClear">
    </template>
    <div class="input-diy">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import clickOutside from './js/clickOutside.js';
  import regular from './js/regular.js';

  export default {
    data() {
      return {
        currentValue: this.value,
        active: false, // 当前输入框是否获取焦点，true已获取焦点
        showEye: this.switchEyeDefaultShow, // 是否默认显示显示明文按钮图标
        eyeOpen: false // 显示明文按钮图标还是密文按钮图标，true文明图标
      };
    },
    props: {
      img: { // 输入框左侧icon图标路劲
        type: String,
        default: ''
      },
      label: { // 输入框左侧提示文本文案
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      regularName: { // 输入框的校验规则名，对应regular.js中的方法名
        type: String,
        default: ''
      },
      align: { // 输入框内容水平对齐样式，默认左对齐
        type: String,
        default: 'left'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disableClear: { // 是否显示清除按钮，true显示
        type: Boolean,
        default: true
      },
      switchEye: { // 是否显示明文密文切换按钮，true显示
        type: Boolean,
        default: false
      },
      switchEyeDefaultShow: { // 明文密文切换按钮是否默认显示，true默认显示
        type: Boolean,
        default: true
      },
      attr: {},
      value: {}
    },
    directives: { clickOutside },
    computed: {
      // 专治强迫症，输入框文字垂直居中
      inputLineHeight() {
        let ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          return 1.6;
        } else {
          return 1.4;
        }
      },
      // 输入框单行居中模式
      singleLine() {
        if (!this.img && !this.label) {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      },
      // 明文密文显示切换
      eyeOpen(val) {
        if (val) {
          this.$refs.input.setAttribute('type', 'text');
        } else {
          this.$refs.input.setAttribute('type', 'password');
        }
      },
      attr: {
        immediate: true,
        handler(attrs) {
          this.$nextTick(() => {
            if (this.regularName === 'setPhone') {
              this.$refs.input.setAttribute('maxlength', 11);
            }
            if (this.type === 'password') {
              this.$refs.input.setAttribute('maxlength', 16);
            }
            if (this.regularName === 'bankNo') {
              this.$refs.input.setAttribute('maxlength', 19);
            }
            const target = [this.$refs.input, this.$refs.textarea];
            target.forEach(el => {
              if (!el || !attrs) return;
              Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
            });
          });
        }
      },
      // 输入框获取焦点时显示明文密文切换按钮
      active(val) {
        this.showEye = val;
        this.$emit('onActive', this, val);
      }
    },
    methods: {
      doCloseActive() {
        this.active = false;
      },
      doFocus(evt) {
        if (this.readonly) {
          this.$refs.input.blur();
        } else {
          this.active = true;
        }
      },
      handleInput(evt) {
        if (this.regularName) {
          regular[this.regularName](evt.target);
        }
        this.currentValue = evt.target.value;
      },
      // 清除按钮
      handleClear() {
        if (this.disabled || this.readonly) return;
        this.currentValue = '';
        this.$refs.input.focus();
      },
      // 普通单击触发
      clicked() {
        this.$emit('click');
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "InputField.sass";
</style>
