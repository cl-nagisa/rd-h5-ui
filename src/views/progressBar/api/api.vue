<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('value')">value</li>
         <li @click="toPosition('height')">height</li>
         <li @click="toPosition('unit')">unit</li>
         <li @click="toPosition('unitSize')">unitSize</li>
         <li @click="toPosition('unitColor')">unitColor</li>
         <li @click="toPosition('label')">label</li>
         <li @click="toPosition('labelSize')">labelSize</li>
         <li @click="toPosition('labelColor')">labelColor</li>
         <li @click="toPosition('bgColor')">bgColor</li>
         <li @click="toPosition('fgColor')">fgColor</li>
         <li @click="toPosition('isValueShow')">isValueShow</li>
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
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：10</span>
          <p>作用：进度条高度，单位px，默认10px。</p>
        </li>
        <li class="unit">
          <h5>unit</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：进度条右侧数值单位文案，默认空。</p>
        </li>
        <li class="unitSize">
          <h5>unitSize</h5>
          <label>类型：Number</label>
          <span>默认值：14</span>
          <p>作用：进度条右侧文字字号，默认14px。</p>
        </li>
        <li class="unitColor">
          <h5>unitColor</h5>
          <label>类型：String</label>
          <span>默认值：#333</span>
          <p>作用：进度条右侧文字颜色，默认#333。</p>
        </li>
        <li class="label">
          <h5>label</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：进度条左侧提示文案，支持html文本，默认空。</p>
        </li>
        <li class="labelSize">
          <h5>labelSize</h5>
          <label>类型：Number</label>
          <span>默认值：14</span>
          <p>作用：进度条左侧文字字号，默认14px。</p>
        </li>
        <li class="labelColor">
          <h5>labelColor</h5>
          <label>类型：String</label>
          <span>默认值：#333</span>
          <p>作用：进度条左侧文字颜色，默认#333。</p>
        </li>
        <li class="bgColor">
          <h5>bgColor</h5>
          <label>类型：String</label>
          <span>默认值：#eee</span>
          <p>作用：进度条背景色，默认#eee。</p>
        </li>
        <li class="fgColor">
          <h5>fgColor</h5>
          <label>类型：String</label>
          <span>默认值：#ffcc1c</span>
          <p>作用：进度条前景色，默认#ffcc1c。</p>
        </li>
        <li class="isValueShow">
          <h5>isValueShow</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：是否显示进度条右侧进度值及单位，默认false不显示。</p>
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
