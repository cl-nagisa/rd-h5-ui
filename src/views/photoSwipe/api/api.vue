<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('value')">value</li>
         <li @click="toPosition('imgTextShow')">imgTextShow</li>
         <li @click="toPosition('history')">history</li>
         <li @click="toPosition('items')">items</li>
         <h5>方法</h5>
         <li @click="toPosition('init')">init</li>
         <li @click="toPosition('open')">open</li>
         <li @click="toPosition('close')">open</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="value">
          <h5>value</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：仅在history设为false情况下使用，用于作为关闭开启图册的标识，在调用组件时用v-model绑定。</p>
        </li>
        <li class="imgTextShow">
          <h5>imgTextShow</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否显示图片名称，默认true显示。</p>
        </li>
        <li class="history">
          <h5>history</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否启用历史记录模式，默认启用。</p>
        </li>
        <li class="items">
          <h5>items</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：相册中的图片数据。</p>
        </li>
        <h4>方法</h4>
        <li class="init">
          <h5>init</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：初始化相册实例，配置默认选项。</p>
        </li>
        <li class="open">
          <h5>open</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：打开相册。</p>
        </li>
        <li class="close">
          <h5>close</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：关闭相册。</p>
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
