<!-- by fl -->
<template>
  <div class="fl-navbar-wrapper" ref="navWrapper" :class="animation" :style="{ 'height': height + 'px' }">
    <ul :class="{ 'is-scroll': isScroll }">
      <li v-for="(item, index) in menuList" ref="menuBranch" :class="{ 'current': index === currentIndex, 'no-border': animation === 'rabbit' }" @click="menuSwitch(index)">
        <i :style="{ 'line-height': height + 'px' }" v-html="item"></i>
      </li>
      <div v-if="animation === 'rabbit'" ref="currentNav" class="current-nav" :style="{ 'width': navWidth + 'px', 'left': navLeft + 'px' }"></div>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        navScroll: '', // better-scroll实例变量
        currentIndex: this.value, // 当前所选导航条索引
        navWidth: 0, // .current-nav的宽度，取决于当前所选导航条文案的宽度
        navLeft: 0 // .current-nav的left值，取决于当前所选导航文案距离左边的长度
      };
    },
    props: {
      animation: { // 切换导航条时的动画，有“giraffe”、“shark”、“rabbit”三种动画
        type: String,
        default: 'giraffe'
      },
      height: { // 导航条高度，默认34px
        type: Number,
        default: 34
      },
      value: { // 设置初始化时默认所选导航条索引，可以是任意自定义的变量名。在调用组件时用v-model进行绑定
        type: Number,
        default: 0
      },
      isScroll: { // 是否设置水平滚动，当导航条内容较多超出屏幕宽度时可以开启
        type: Boolean,
        default: false
      },
      bounce: { // 是否设置回弹效果
        type: Boolean,
        default: true
      },
      menuList: { // 导航条文案数据
        type: Array
      }
    },
    watch: {
      value(val) {
        this.currentIndex = val;
      },
      currentIndex(val) {
        this.$emit('input', val);
        if (this.animation === 'rabbit') {
          this.$refs.currentNav.style.transition = 'left .2s';
        }
        this.calculation();
      },
      menuList(val) {
        this.$nextTick(() => {
          if (this.menuList.length > 0) {
            this._createScroll();
            this.calculation();
          }
        });
      }
    },
    created() {
      this.$nextTick(() => {
        if (this.menuList.length > 0) {
          this._createScroll();
          this.calculation();
        }
      });
    },
    methods: {
      // 切换导航条
      menuSwitch(index) {
        this.currentIndex = index;
        this.$emit('clicked', index);
      },
      // 计算navWidth和navLeft
      calculation() {
        if (this.animation === 'rabbit') {
          this.navWidth = this.$refs.menuBranch[this.currentIndex] ? this.$refs.menuBranch[this.currentIndex].children[0].clientWidth : '';
          this.navLeft = this.$refs.menuBranch[this.currentIndex] ? this.$refs.menuBranch[this.currentIndex].children[0].offsetLeft : '';
        }
      },
      // 初始化better-scroll实例
      _createScroll() {
        if (!this.navScroll) {
          this.navScroll = new BScroll(this.$refs.navWrapper, {
            scrollX: true,
            scrollY: false,
            bounce: this.bounce,
            click: true,
            probeType: 2,
            bounceTime: 500
          });
          this.scrollToElement(this.currentIndex);
        } else {
          this.navScroll.refresh();
        }
      },
      // 定位到指定位置
      scrollToElement(index, time = '', offsetX = '', offsetY = '', easing = '') {
        this.$nextTick(() => {
          if (this.$refs.menuBranch[index]) {
            this.navScroll.scrollToElement(this.$refs.menuBranch[index], time, offsetX, offsetY, easing);
          }
        });
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Navbar.sass";
</style>
