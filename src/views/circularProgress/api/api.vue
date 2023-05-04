<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('value')">value</li>
         <li @click="toPosition('radius')">radius</li>
         <li @click="toPosition('borderWidth')">borderWidth</li>
         <li @click="toPosition('textSize')">textSize</li>
         <li @click="toPosition('text')">text</li>
         <li @click="toPosition('textColor')">textColor</li>
         <li @click="toPosition('bgColor')">bgColor</li>
         <li @click="toPosition('borderBgColor')">borderBgColor</li>
         <li @click="toPosition('borderFgColor')">borderFgColor</li>
         <li @click="toPosition('gradientModel')">gradientModel</li>
         <li @click="toPosition('isGradient')">isGradient</li>
         <li @click="toPosition('gradientArray')">gradientArray</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="value">
          <h5>value</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：进度值，默认0。</p>
        </li>
        <li class="radius">
          <h5>radius</h5>
          <label>类型：Number</label>
          <span>默认值：30</span>
          <p>作用：圆的半径，默认30px。</p>
        </li>
        <li class="borderWidth">
          <h5>borderWidth</h5>
          <label>类型：Number</label>
          <span>默认值：3</span>
          <p>作用：圆的边宽，默认3px。</p>
        </li>
        <li class="textSize">
          <h5>textSize</h5>
          <label>类型：Number</label>
          <span>默认值：12</span>
          <p>作用：圆心文案字体大小，默认12px。</p>
        </li>
        <li class="text">
          <h5>text</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：圆心文案内容，支持html内容。默认为空，此时圆心会显示进度值。</p>
        </li>
        <li class="textColor">
          <h5>text</h5>
          <label>类型：String</label>
          <span>默认值：#333</span>
          <p>作用：圆心文案颜色，默认#333。</p>
        </li>
        <li class="bgColor">
          <h5>bgColor</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：圆内背景色，默认无色。</p>
        </li>
        <li class="borderBgColor">
          <h5>borderBgColor</h5>
          <label>类型：String</label>
          <span>默认值：#eee</span>
          <p>作用：边宽背景色，默认#eee。</p>
        </li>
        <li class="borderFgColor">
          <h5>borderFgColor</h5>
          <label>类型：String</label>
          <span>默认值：#f95a28</span>
          <p>作用：宽边前景色，默认#f95a28。</p>
        </li>
        <li class="gradientModel">
          <h5>gradientModel</h5>
          <label>类型：String</label>
          <span>默认值：vertical</span>
          <p>作用：仅在isGradient设为true时可用。圆边框颜色渐变模式，vertical垂直渐变，horizontal水平模式，默认垂直渐变。</p>
        </li>
        <li class="isGradient">
          <h5>isGradient</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否开启渐变模式，默认false不开启。</p>
        </li>
        <li class="gradientArray">
          <h5>gradientArray</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：渐变颜色数组。子项有offset渐变进度，color渐变颜色。</p>
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
