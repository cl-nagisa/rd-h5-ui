<!-- by fl -->
<template>
  <div>
    <div ref="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div v-show="imgTextShow" class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoSwipe from 'photoSwipe'; // 引入npm依赖中的PhotoSwipe.js
  import UI from 'photoswipe/dist/photoswipe-ui-default'; // 引入npm依赖中的photoswipe-ui-default.js，用于默认样式库

  export default {
    data() {
      return {
        gallery: '', // 相册实例
        display: false // 相册显示隐藏，true显示
      };
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      imgTextShow: { // 是否显示图片名称，默认显示
        type: Boolean,
        default: true
      },
      history: { // 是否启用历史记录模式，默认启用
        type: Boolean,
        default: true
      },
      items: { // 相册中的图片数据
        type: Array
      }
    },
    watch: {
      value(val) {
        this.display = val;
      },
      display(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      // 初始化相册实例，配置默认选项
      init() {
        let pswpElement = this.$refs.pswp;
        let options = {
          index: 0,
          galleryUID: 1,
          bgOpacity: 1,
          spacing: 0.12,
          maxSpreadZoom: 2,
          showAnimationDuration: 333,
          hideAnimationDuration: 333,
          errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">图片</a> 加载失败.</div>',
          mainClass: '',
          showHideOpacity: true,
          allowPanToNext: true,
          loop: true,
          pinchToClose: true,
          closeOnScroll: true,
          closeOnVerticalDrag: true,
          mouseUsed: false,
          escKey: true,
          arrowKeys: true,
          history: this.history,
          galleryPIDs: false,
          focus: true,
          modal: true,
          shareEl: false,
          fullscreenEl: false,
          preload: [ 1, 1 ]
        };
        this.gallery = new PhotoSwipe(pswpElement, UI, this.items, options);
        this.gallery.listen('close', () => {
          if (this.history === false) {
            this.display = false;
          }
        });
      },
      // 打开相册
      open() {
        this.gallery.init();
        if (this.history === false) {
          this.display = true;
        }
      },
      // 关闭相册
      close() {
        this.gallery.close();
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "./assets/photoswipe.css";
  @import "./assets/default-skin/default-skin.css";
</style>
