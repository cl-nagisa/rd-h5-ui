<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('src')">src</li>
         <li @click="toPosition('poster')">poster</li>
         <li @click="toPosition('width')">width</li>
         <li @click="toPosition('height')">height</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="src">
          <h5>src</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：视频地址，仅支持服务器地址形式。</p>
        </li>
        <li class="poster">
          <h5>poster</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：视频封面图片地址，仅支持服务器地址形式。</p>
        </li>
        <li class="width">
          <h5>width</h5>
          <label>类型：Number</label>
          <span>默认值：-1</span>
          <p>作用：播放器宽度，单位px，默认-1表示宽度为100%。</p>
        </li>
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：-1</span>
          <p>作用：播放器高度，单位px，默认-1表示高度为100%。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        isMenuShow: false
      };
    },
    created() {
      this.$nextTick(() => {
        this._initWheel('menuList', this.$refs.menuList);
        this._initWheel('apiList', this.$refs.apiList);
      });
    },
    methods: {
      _initWheel(name, dom) {
        this[name] = new BScroll(dom, {
          bounce: false,
          click: true,
          probeType: 2
        });
        if (name === 'apiList') {
          this[name].on('scroll', () => {
            this.isMenuShow = false;
          });
        }
      },
      toShowMenu() {
        this.isMenuShow = !this.isMenuShow;
      },
      toPage() {
        this.$router.push({ name: 'demo' });
      },
      toPosition(dom) {
        let position = this.$el.querySelector('.' + dom);
        this.apiList.scrollToElement(position);
        this.isMenuShow = false;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "api.sass";
</style>
