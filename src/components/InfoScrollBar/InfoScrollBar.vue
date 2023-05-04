<!-- by fl -->
<template>
  <div class="fl-isb-wrapper" ref="isbWrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isRunFlag: true // 开启/暂停滚动效果开关，true开启
      };
    },
    props: {
      height: { // 滚动区域高度，默认为0不滚动
        type: Number,
        default: 0
      },
      speed: { // 每一次滚动的滚动速度，默认40毫秒
        type: Number,
        default: 40
      },
      delay: { // 间隔多久滚动一次，默认3000毫秒滚动一次，设为0为实时滚动
        type: Number,
        default: 3000
      }
    },
    watch: {
      // 监听height，当异步获取height参数时，判断height是否大于0，大于0则开启滚动
      height(val) {
        if (val > 0) {
          this.run();
        }
      }
    },
    methods: {
      // 初始化开启滚动效果
      run() {
        if (this.height > 0) {
          this.$nextTick(() => {
            this.startmarquee(this.height, this.speed, this.delay);
          });
        }
      },
      // 开启滚动
      start() {
        this.isRunFlag = true;
      },
      // 暂停滚动
      stop() {
        this.isRunFlag = false;
      },
      // 滚动动画实现原理
      startmarquee(height, speed, delay) {
        let t = '';
        let o = this.$refs.isbWrapper.childNodes[0]; // 获取滚动区域的dom
        o.style.marginTop = 0;
        clearInterval(t);
        let start = () => {
          t = setInterval(scrolling, speed);
          if (!this.isRunFlag) {
            return false;
          }
          o.style.marginTop = parseInt(o.style.marginTop) - 1 + 'px'; // 执行一次滚动动画
        };
        let scrolling = () => {
          // 判断有没有完整的完成一次滚动周期
          if (parseInt(o.style.marginTop) % height !== 0) { // 完成，重置滚动
            if (!this.isRunFlag) {
              return false;
            }
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + 'px';
            if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) {
              o.style.marginTop = 0;
            }
          } else { // 没有完成，继续滚动
            clearInterval(t);
            setTimeout(start, delay);
          }
        };
        setTimeout(start, delay);
      }
    }
  };
</script>
