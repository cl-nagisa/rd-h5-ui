<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('animation')">animation</li>
         <li @click="toPosition('height')">height</li>
         <li @click="toPosition('isScroll')">isScroll</li>
         <li @click="toPosition('bounce')">bounce</li>
         <li @click="toPosition('menuList')">menuList</li>
         <li @click="toPosition('value')">value</li>
         <h5>事件</h5>
         <li @click="toPosition('clicked')">clicked</li>
         <h5>方法</h5>
         <li @click="toPosition('scrollToElement')">scrollToElement</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="animation">
          <h5>animation</h5>
          <label>类型：String</label>
          <span>默认值：giraffe</span>
          <p>作用：切换导航条时的动画，有“giraffe”、“shark”、“rabbit”三种动画。</p>
        </li>
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：34</span>
          <p>作用：导航条高度，默认34px。</p>
        </li>
        <li class="isScroll">
          <h5>isScroll</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否设置水平滚动，当导航条内容较多超出屏幕宽度时可以开启。默认不开启。</p>
        </li>
        <li class="bounce">
          <h5>bounce</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否设置回弹效果，默认不开启，仅当isScroll设为true时生效。</p>
        </li>
        <li class="menuList">
          <h5>menuList</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：导航条文案数据。</p>
        </li>
        <li class="value">
          <h5>value</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：设置初始化时默认所选导航条索引，可以是任意自定义的变量名。在调用组件时用v-model进行绑定。默认值为0。</p>
        </li>
        <h5>事件</h5>
        <li class="clicked">
          <h5>clicked</h5>
          <label>参数：index</label>
          <span>触发时机：单击某个标签时触发。</span>
          <p>作用：派发当前点击的标签的数组下标。表示哪一个标签被点击了。</p>
        </li>
        <h4>方法</h4>
        <li class="scrollToElement">
          <h5>scrollToElement</h5>
          <label>参数：index, time, offsetX, offsetY, easing</label>
          <span>返回值：无</span>
          <p>作用：自动定位并滚动到指定位置。参数index为menuList的数组下标。其他参数及用法参照better-scroll官方api文档。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../../assets/js/api.js';

  export default {
    mixins: [ api ]
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "../../../assets/sass/api.sass";
</style>
