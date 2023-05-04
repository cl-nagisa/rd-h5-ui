<!-- by fl -->
<template>
  <div class="fl-catalog">
    <div class="fl-catalog-button" @click="toShow">目录</div>
    <div v-show="isShow" class="fl-modal" @click="toHide">
      <div class="fl-modal-tips" :class="{ 'open': isTipsShow }">
        <label>轻触这里<br>关闭目录</label>
        <img src="../assets/images/click.png">
      </div>
    </div>
    <transition name="fl-right">
      <div v-show="isShow" class="fl-catalog-wrapper" ref="catalogWrapper">
        <ul>
          <li v-for="(item, index) in slots" :class="{ 'current': index === currentIndex }" @click="toPosition(index)">{{ item.name }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        catalogScroll: '', // 目录列表better-scroll实例变量
        isShow: false, // 显示/关闭目录组件
        isTipsShow: false // 显示/关闭“关闭目录”小提示
      };
    },
    props: {
      currentIndex: { // 当前所选组的数组下标
        type: Number,
        default: 0
      },
      slots: { // 数据源
        type: Array,
        default: []
      }
    },
    watch: {
      // 监听目录组件的开启与关闭，每次开启都会创建或重置better-scroll实例，每次关闭都会停止所有列表的滚动
      isShow(val) {
        if (val) {
          this._initScroll();
          setTimeout(() => {
            this.isTipsShow = val;
          }, 300);
        } else {
          this.isTipsShow = val;
          if (this.catalogScroll) {
            this.catalogScroll.stop();
          }
        }
      }
    },
    methods: {
      // 初始化better-scroll实例
      _initScroll() {
        this.$nextTick(() => {
          if (!this.catalogScroll) {
            this.catalogScroll = new BScroll(this.$refs.catalogWrapper, {
              bounce: false,
              click: true,
              probeType: 2
            });
          } else {
            this.catalogScroll.refresh();
          }
          this.scrollTo(this.currentIndex); // 默认滚动到当前的currentIndex
        });
      },
      // 指定滚动到当前better-scroll实例的某个dom位置
      scrollTo(index) {
        let dom = this.$refs.catalogWrapper.childNodes[0].childNodes[index];
        this.catalogScroll.scrollToElement(dom);
      },
      // 从目录中选择了某一项
      toPosition(index) {
        this.scrollTo(index);
        this.isShow = false;
        this.$emit('toPosition', index); // 向调用者派发当前选择位置的索引
      },
      // 开启目录组件
      toShow() {
        this.isShow = true;
      },
      // 关闭目录组件
      toHide() {
        this.isShow = false;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Catalog.sass";
</style>
