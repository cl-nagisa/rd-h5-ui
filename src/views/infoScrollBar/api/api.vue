<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('delay')">delay</li>
         <li @click="toPosition('height')">height</li>
         <li @click="toPosition('speed')">speed</li>
         <h5>方法</h5>
         <li @click="toPosition('run')">run</li>
         <li @click="toPosition('start')">start</li>
         <li @click="toPosition('stop')">stop</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="delay">
          <h5>delay</h5>
          <label>类型：Number</label>
          <span>默认值：3000</span>
          <p>作用：设置间隔多久滚动一次，默认3000毫秒滚动一次，设为0为实时滚动。数值越小，滚动频率越快。</p>
        </li>
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：设置滚动区域高度，默认为0不滚动。该参数决定了可视滚动区域的高度，一般为容器的高度。</p>
        </li>
        <li class="speed">
          <h5>speed</h5>
          <label>类型：Number</label>
          <span>默认值：40</span>
          <p>作用：设置每一次滚动的滚动速度，默认40毫秒。数值越小，滚动速度越快。</p>
        </li>
        <h4>方法</h4>
        <li class="run">
          <h5>run</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：首次开启滚动效果，相当于实例化。</p>
        </li>
        <li class="start">
          <h5>start</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：当已经暂停滚动效果的情况下，该方法才有用。重新开启滚动效果，并不会再次实例化。与run方法有区别。</p>
        </li>
        <li class="stop">
          <h5>stop</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：当已经开启滚动效果的情况下，该方法才有用。暂时停止滚动效果，停留在当前滚动位置。</p>
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
