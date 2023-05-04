<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('navIndex')">navIndex</li>
         <li @click="toPosition('height')">height</li>
         <li @click="toPosition('pullingTime')">pullingTime</li>
         <li @click="toPosition('isRefreshByNav')">isRefreshByNav</li>
         <li @click="toPosition('pullDownRefresh')">pullDownRefresh</li>
         <li @click="toPosition('pullUpLoad')">pullUpLoad</li>
         <li @click="toPosition('click')">click</li>
         <li @click="toPosition('isAllLoad')">isAllLoad</li>
         <h5>事件</h5>
         <li @click="toPosition('scroll')">scroll</li>
         <li @click="toPosition('scrollEnd')">scrollEnd</li>
         <h5>方法</h5>
         <li @click="toPosition('scrollToElement')">scrollToElement</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="navIndex">
          <h5>navIndex</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：当有多个画布切换时使用，当前画布索引值，默认0只有一个画布。</p>
        </li>
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：画布高度，同时也决定了可滑动区域的高度，默认0。</p>
        </li>
        <li class="pullingTime">
          <h5>pullingTime</h5>
          <label>类型：Number</label>
          <span>默认值：500</span>
          <p>作用：下拉刷新和上拉加载时的停留动画时间，默认500毫秒。</p>
        </li>
        <li class="isRefreshByNav">
          <h5>isRefreshByNav</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否根据navIndex变化而刷新scroll实例，true刷新scroll实例，false滚动位置重置到默认位置。结合navIndex属性使用，当navIndex发生变化时，刷新或重置滚动位置。默认true。</p>
        </li>
        <li class="pullDownRefresh">
          <h5>pullDownRefresh</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否开启下拉刷新功能，true开启，默认开启。</p>
        </li>
        <li class="pullUpLoad">
          <h5>pullUpLoad</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否开启上拉加载功能，true开启，默认开启。</p>
        </li>
        <li class="click">
          <h5>click</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否开启better-scorll单击配置选项，默认开启。</p>
        </li>
        <li class="isAllLoad">
          <h5>isAllLoad</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否还能上拉加载，用来判断是否还有下一页数据，ture不能上拉加载，默认false。</p>
        </li>
        <h5>事件</h5>
        <li class="scroll">
          <h5>scroll</h5>
          <label>参数：pos</label>
          <span>触发时机：画布滚动中实时触发。</span>
          <p>作用：派发当前实时滚动位置，参数pos.x为水平坐标，pos.y为垂直坐标。</p>
        </li>
        <li class="scrollEnd">
          <h5>scrollEnd</h5>
          <label>参数：pos</label>
          <span>触发时机：画布滚动后触发。</span>
          <p>作用：派发当前滚动位置，参数pos.x为水平坐标，pos.y为垂直坐标。</p>
        </li>
        <h5>方法</h5>
        <li class="scrollTo">
          <h5>scrollTo</h5>
          <label>参数：x, y, time, easing</label>
          <span>返回值：无</span>
          <p>作用：自动定位并滚动到指定坐标位置。参数及用法参照better-scroll官方api文档。</p>
        </li>
        <li class="scrollToElement">
          <h5>scrollToElement</h5>
          <label>参数：dom, time, offsetX, offsetY, easing</label>
          <span>返回值：无</span>
          <p>作用：自动定位并滚动到指定dom位置。参数及用法参照better-scroll官方api文档。</p>
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
