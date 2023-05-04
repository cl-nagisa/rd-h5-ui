<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
          <li @click="toPosition('isSupportFeatureDay')">isSupportFeatureDay</li>
          <li @click="toPosition('FailData')">FailData</li>
          <li @click="toPosition('SuccessData')">SuccessData</li>
          <li @click="toPosition('StartYear')">StartYear</li>
          <li @click="toPosition('EndYear')">EndYear</li>
          <li @click="toPosition('EndYear')">EndYear</li>
         <h5>方法</h5>
          <li @click="toPosition('')"></li>

       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="isSupportFeatureDay">
          <h5>isSupportFeatureDay</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：标记出特殊日期</p>
        </li>
        <li class="FailData">
          <h5>FailData</h5>
          <label>类型：Array</label>
          <span>默认值：[]</span>
          <p>作用：输入失败标记特殊日期</p>
        </li>
        <li class="SuccessData">
          <h5>SuccessData</h5>
          <label>类型：Array</label>
          <span>默认值：[]</span>
          <p>作用：输入成功标记特殊日期</p>
        </li>
        <li class="StartYear">
          <h5>StartYear</h5>
          <label>类型：Number</label>
          <span>默认值：1900</span>
          <p>作用：最小年份</p>
        </li>
        <li class="EndYear">
          <h5>EndYear</h5>
          <label>类型：Number</label>
          <span>默认值：2030</span>
          <p>作用：最小年份</p>
        </li>
        <li class="remark">
          <h5>remark</h5>
          <label>类型：Array</label>
          <span>默认值：[]</span>
          <p>作用：日期备注</p>
        </li>
        <h4>方法</h4>
        <li class="">
          <h5></h5>
          <label></label>
          <span></span>
          <p></p>
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
