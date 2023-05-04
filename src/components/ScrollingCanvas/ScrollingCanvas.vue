<!-- by fl -->
<template>
  <div class="fl-scrolling-wrapper" ref="scrollingWrapper" :style="{ 'height': height + 'px' }">
    <div class="scroll-content">
      <div class="slot" :style="{ 'min-height': minHeight + 'px' }">
        <slot></slot>
      </div>
      <div v-if="pullDownRefresh" class="pullDown-wrapper">
        <img v-show="pullDownLoading" src="./images/loading.gif">
        <span>{{ pullDownText }}</span>
      </div>
      <div v-if="pullUpLoad" class="pullUp-wrapper">
        <img v-show="pullUpLoading" src="./images/loading.gif">
        <span>{{ pullUpText }}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        scroll: '', // better-scroll实例
        timer: '', // 定时器实例
        scrollY: 0, // better-scroll滚动区域y轴值
        pullDownText: '下拉刷新', // 下拉刷新文案
        pullUpText: '上拉加载', // 上拉加载文案
        pullDownLoading: false, // 下拉刷新图片显示，true显示
        pullUpLoading: false, // 上拉加载图片显示，true显示
        pullUpLoadingRepeatFlag: false // 上拉加载防重复标识，true正在加载中
      };
    },
    props: {
      navIndex: { // 当有多个画布切换时使用，当前画布索引值，默认0只有一个画布
        type: Number,
        default: 0
      },
      height: { // 画布高度，同时也决定了可滑动区域的高度，默认0
        type: Number,
        default: 0
      },
      pullingTime: { // 下拉刷新和上拉加载时的停留动画时间，默认500毫秒
        type: Number,
        default: 500
      },
      isRefreshByNav: { // 是否根据navIndex变化而刷新scroll实例，true刷新scroll实例，false滚动位置重置到默认位置
        type: Boolean,
        default: true
      },
      pullDownRefresh: { // 是否开启下拉刷新功能，true开启，默认开启
        type: Boolean,
        default: true
      },
      pullUpLoad: { // 是否开启上拉加载功能，true开启，默认开启
        type: Boolean,
        default: true
      },
      click: { // 是否开启better-scorll单击配置选项，默认开启
        type: Boolean,
        default: true
      },
      isAllLoad: { // 是否还能上拉加载，用来判断是否还有下一页数据
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 计算最小高度值，用于scroll滚动
      minHeight() {
        if (this.pullDownRefresh || this.pullUpLoad) {
          return this.height + 1;
        } else {
          return '';
        }
      },
      // 是否开启回弹动画，在同时关闭下拉刷新和上拉加载功能时关闭动画效果
      isBounce() {
        if (this.pullDownRefresh === false && this.pullUpLoad === false) {
          return false;
        } else {
          return true;
        }
      },
      // 是否开启下拉刷新功能，开启则配置相关参数
      isPullDownRefresh() {
        if (this.pullDownRefresh) {
          return {
            threshold: 50,
            stop: 40
          };
        } else {
          return false;
        }
      },
      // 是否开启下拉刷新功能，开启则配置相关参数
      isPullUpLoad() {
        if (this.pullUpLoad) {
          return {
            threshold: 0
          };
        } else {
          return false;
        }
      }
    },
    watch: {
      // 监听画布切换，重置当前滑动位置与滑动状态
      navIndex(val) {
        clearTimeout(this.timer);
        if (this.isRefreshByNav) {
          this.scroll.refresh();
        } else {
          this.scroll.scrollTo(0, 0);
        }
      },
      // 监听画布大小，如果发生变化则更新滑动区域高度
      height(val) {
        if (this.scroll) {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      // 监听y轴滚动距离，调整下拉刷新和上拉加载的显示
      scrollY(val) {
        if (this.pullDownRefresh) {
          if (this.pullDownLoading === false) {
            if (val > 50) {
              this.pullDownText = '释放更新';
            } else {
              this.pullDownText = '下拉更新';
            }
          }
        }
      },
      // 在手动开启下拉刷新功能后重新初始化better-scroll
      pullDownRefresh(val) {
        this.scroll.destroy();
        this._initScroll(this.$refs.scrollingWrapper);
      },
      // 在手动开启上拉加载功能后重新初始化better-scroll
      pullUpLoad(val) {
        this.scroll.destroy();
        this._initScroll(this.$refs.scrollingWrapper);
      }
    },
    created() {
      this.$nextTick(() => {
        this._initScroll(this.$refs.scrollingWrapper);
      });
    },
    methods: {
      // 初始化better-scroll实例
      _initScroll(dom) {
        this.scroll = new BScroll(dom, {
          bounce: this.isBounce,
          pullDownRefresh: this.isPullDownRefresh,
          pullUpLoad: this.isPullUpLoad,
          click: this.click,
          probeType: 2
        });
        this.scroll.on('scroll', (pos) => {
          this.scrolling(pos);
        });
        this.scroll.on('scrollEnd', (pos) => {
          this.scrollEnd(pos);
        });
        this.scroll.on('pullingDown', () => {
          this.pullingDown();
        });
        this.scroll.on('pullingUp', () => {
          this.pullingUp();
        });
      },
      // 滚动到指定坐标位置
      scrollTo(x = 0, y = 0, time = '', easing = '') {
        this.scroll.scrollTo(x, y, time, easing);
      },
      // 定位到指定dom位置
      scrollToElement(dom, time = '', offsetX = '', offsetY = '', easing = '') {
        this.scroll.scrollToElement(dom, time, offsetX, offsetY, easing);
      },
      // 滚动或拖动中
      scrolling(pos) {
        this.$emit('scroll', pos);
        this.scrollY = pos.y;
      },
      // 滚动或拖动结束
      scrollEnd(pos) {
        this.$emit('scrollEnd', pos);
      },
      // 下拉刷新
      pullingDown() {
        this.pullDownLoading = true;
        this.pullDownText = '更新中';
        this.timer = setTimeout(() => {
          this.pullDownLoading = false;
          this.scroll.finishPullDown();
          this.$emit('finishDown');
        }, this.pullingTime);
        setTimeout(() => {
          this.scroll.refresh();
        }, this.pullingTime + 100);
      },
      // 上拉加载
      pullingUp() {
        this.scroll.refresh();
        if (this.pullUpLoadingRepeatFlag) {
          this.scroll.finishPullUp();
          return false;
        }
        this.pullUpLoadingRepeatFlag = true;
        if (!this.isAllLoad) {
          this.pullUpLoading = true;
          this.pullUpText = '加载中';
        } else {
          this.pullUpText = '暂无更多数据加载哦~';
        }
        this.timer = setTimeout(() => {
          this.pullUpLoading = false;
          if (this.isAllLoad) {
            this.pullUpText = '暂无更多数据加载哦~';
          } else {
            this.pullUpText = '上拉加载';
          }
          this.scroll.finishPullUp();
          if (!this.isAllLoad) {
            this.$emit('finishUp');
          }
        }, this.pullingTime);
        setTimeout(() => {
          this.pullUpLoadingRepeatFlag = false;
        }, this.pullingTime + 500);
        setTimeout(() => {
          this.scroll.refresh();
        }, this.pullingTime + 100);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "ScrollingCanvas.sass";
</style>
