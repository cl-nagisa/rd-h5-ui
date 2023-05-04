<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('minYear')">minYear</li>
         <li @click="toPosition('maxYear')">maxYear</li>
         <li @click="toPosition('nowTime')">nowTime</li>
         <li @click="toPosition('mode')">mode</li>
         <h5>事件</h5>
         <li @click="toPosition('selectDate')">selectDate</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="minYear">
          <h5>minYear</h5>
          <label>类型：Number</label>
          <span>默认值：当前系统年份 - 50</span>
          <p>作用：设置日历可选年份的最小值。</p>
        </li>
        <li class="maxYear">
          <h5>maxYear</h5>
          <label>类型：Number</label>
          <span>默认值：当前系统年份 + 50</span>
          <p>作用：设置日历可选年份的最大值。</p>
        </li>
        <li class="nowTime">
          <h5>nowTime</h5>
          <label>类型：Number</label>
          <span>默认值：当前系统时间，时间戳格式</span>
          <p>作用：设置日历当前默认所选时间，如今天。</p>
        </li>
        <li class="mode">
          <h5>mode</h5>
          <label>类型：String</label>
          <span>默认值：alert</span>
          <p>作用：设置年份、月份选择模式，alert 弹窗形式 picker 下拉选择框模式。</p>
        </li>
        <h4>事件</h4>
        <li class="selectDate">
          <h5>selectDate</h5>
          <label>参数：obj（nowYear：当前所选年份，nowMonth：当前所选月份，nowDate：当前所选日期；nowWeek：当前所选日期的星期）</label>
          <span>触发时机：每一次选择完日期后触发。</span>
          <p>作用：返回当前所选日期的完整格式，年月日星期。</p>
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
