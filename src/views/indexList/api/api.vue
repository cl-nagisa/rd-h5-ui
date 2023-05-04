<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('isHeader')">isHeader</li>
         <li @click="toPosition('isAutoFirstChat')">isAutoFirstChat</li>
         <li @click="toPosition('isOrderByFirstChat')">isOrderByFirstChat</li>
         <li @click="toPosition('isCatalog')">isCatalog</li>
         <li @click="toPosition('isSearch')">isSearch</li>
         <li @click="toPosition('searchTransitionName')">searchTransitionName</li>
         <li @click="toPosition('slots')">slots</li>
         <li @click="toPosition('slots-name')">slots.name</li>
         <li @click="toPosition('slots-items')">slots.items</li>
         <li @click="toPosition('transitionName')">transitionName</li>
         <li @click="toPosition('title')">title</li>
         <li @click="toPosition('value')">value</li>
         <h5>事件</h5>
         <li @click="toPosition('select')">select</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="isHeader">
          <h5>isHeader</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否显示顶部导航栏，默认显示。顶部导航栏自带标题和一个返回按钮。</p>
        </li>
        <li class="isAutoFirstChat">
          <h5>isAutoFirstChat</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否开启自动由组件来转换原数据为组件可用格式数据，在按首字母汉字拼音排序时可用，默认不开启。详情可参见demo中的<u @click="toPage">“人员名单-按拼音”</u>。</p>
        </li>
        <li class="isOrderByFirstChat">
          <h5>isOrderByFirstChat</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否开启按首字母汉字拼音排序功能，一般用在通讯录场景中，默认不开启。开启后会在页面右侧显示出字母排序列表。详情可参见demo中的<u @click="toPage">“人员名单-按拼音”</u>。</p>
        </li>
        <li class="isCatalog">
          <h5>isCatalog</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否开启目录功能，默认不开启。开启后会在页面右下出显示“目录”按钮，可通过目录列表快速定位到指定位置。</p>
        </li>
        <li class="isSearch">
          <h5>isSearch</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否开启搜索查询功能，默认不开启。开启后会在页面右下出显示一个带有放大镜图标的按钮，可通过输入关键字搜索想要的数据并选择数据。</p>
        </li>
        <li class="searchTransitionName">
          <h5>searchTransitionName</h5>
          <label>类型：String</label>
          <span>默认值：right</span>
          <p>作用：显示/关闭搜索功能时的动画效果，共9种：fade、top、bottom、left、right、topleft、topRight、bottomLeft、bottomRight，默认right。</p>
        </li>
        <li class="slots">
          <h5>slots</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：列表数据源。详细子属性请往下看。</p>
        </li>
        <li class="slots-name">
          <h5>slots.name</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：每一组数据的组名。</p>
        </li>
        <li class="slots-items">
          <h5>slots.items</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：每一组数据的元素。</p>
        </li>
        <li class="transitionName">
          <h5>transitionName</h5>
          <label>类型：String</label>
          <span>默认值：right</span>
          <p>作用：显示/关闭索引列表时的动画效果，共9种：fade、top、bottom、left、right、topleft、topRight、bottomLeft、bottomRight，默认right。</p>
        </li>
        <li class="title">
          <h5>title</h5>
          <label>类型：String</label>
          <span>默认值：标题</span>
          <p>作用：顶部导航栏的标题文案。仅在isHeader为true时生效。</p>
        </li>
        <li class="value">
          <h5>value</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：用来开启或关闭索引列表的开关。可以是任意自定义的变量名。在调用组件时用v-model进行绑定。</p>
        </li>
        <h4>事件</h4>
        <li class="select">
          <h5>select</h5>
          <label>参数：value</label>
          <span>触发时机：选择了某一元素后触发。</span>
          <p>作用：在选择完某一元素后记录当前选择的本文内容。value值就是当前所选内容。</p>
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
