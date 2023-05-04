<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
          <li @click="toPosition('isSupportFeatureDay')">isSupportFeatureDay</li>
          <li @click="toPosition('FeatureDay')">FailData</li>
          <li @click="toPosition('StartYear')">StartYear</li>
          <li @click="toPosition('EndYear')">EndYear</li>
          <li @click="toPosition('EndYear')">EndYear</li>
         <h5>方法</h5>
          <li @click="toPosition('getValue')">getValue</li>
         <li @click="toPosition('getRemark')">getRemark</li>
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
        <li class="FeatureDay">
          <h5>FeatureDay</h5>
          <label>类型：Array</label>
          <span>默认值：[]</span>
          <p>作用：输入标记特殊日期</p>
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
        <li class="getValue">
          <h5>getValue</h5>
          <label>参数：年，月，日，星期</label>
          <span>触发时机：点击选中日期</span>
          <p>作用：收到当前日期的信息</p>
        </li>
        <li class="getRemark">
          <h5>getRemark</h5>
          <label>参数：年，月，日，备注信息</label>
          <span>触发时机：打开备注信息，按下保存时触发</span>
          <p>作用：收到相应日期的备注信息</p>
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
