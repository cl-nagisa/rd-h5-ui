<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('bgColor')">bgColor</li>
         <li @click="toPosition('border')">border</li>
         <li @click="toPosition('columns')">columns</li>
         <li @click="toPosition('height')">height</li>
         <li @click="toPosition('items')">items</li>
         <li @click="toPosition('items-bgColor')">items.bgColor</li>
         <li @click="toPosition('items-icon')">items.icon</li>
         <li @click="toPosition('items-iconWidth')">items.iconWidth</li>
         <li @click="toPosition('items-iconHeight')">items.iconHeight</li>
         <li @click="toPosition('items-text')">items.text</li>
         <li @click="toPosition('items-textSize')">items.textSize</li>
         <li @click="toPosition('items-textColor')">items.textColor</li>
         <li @click="toPosition('items-link')">items.link</li>
         <h5>事件</h5>
         <li @click="toPosition('callBack')">callBack</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="bgColor">
          <h5>bgColor</h5>
          <label>类型：String</label>
          <span>默认值：白色(#fff)</span>
          <p>作用：整个水平单元格的背景色。默认白色。</p>
        </li>
        <li class="border">
          <h5>border</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：是否添加单元格边框样式。默认无边框。共有两种样式，“all”田字型边框和“floor”单行型边框。</p>
        </li>
        <li class="columns">
          <h5>columns</h5>
          <label>类型：Number</label>
          <span>默认值：3</span>
          <p>作用：设置N列。由组件自动排版。</p>
        </li>
        <li class="height">
          <h5>height</h5>
          <label>类型：Number</label>
          <span>默认值：80</span>
          <p>作用：设置每行单元格的行高，单位px，默认80px。</p>
        </li>
        <li class="items">
          <h5>items</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：单元格数据列表。详细子属性请往下看。</p>
        </li>
        <li class="items-bgColor">
          <h5>items.bgColor</h5>
          <label>类型：String</label>
          <span>默认值：空(#fff)</span>
          <p>作用：设置单个单元格的背景颜色。默认白色。</p>
        </li>
        <li class="items-icon">
          <h5>items.icon</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：设置单元格的icon图标或图片。该参数相当于img标签的src属性，用来放素材路劲。需要用require引用。</p>
        </li>
        <li class="items-iconWidth">
          <h5>items.iconWidth</h5>
          <label>类型：Number</label>
          <span>默认值：24</span>
          <p>作用：设置单元格的icon的宽度，单位px，默认24px。</p>
        </li>
        <li class="items-iconHeight">
          <h5>items.iconHeight</h5>
          <label>类型：Number</label>
          <span>默认值：24</span>
          <p>作用：设置单元格的icon的高度，单位px，默认24px。</p>
        </li>
        <li class="items-text">
          <h5>items.text</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：设置单元格的文案内容，支持html标签，可自行设置样式。</p>
        </li>
        <li class="items-textSize">
          <h5>items.textSize</h5>
          <label>类型：Number</label>
          <span>默认值：空</span>
          <p>作用：设置单元格的文案字号，默认空，14px。</p>
        </li>
        <li class="items-textColor">
          <h5>items.textColor</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：设置单元格的文案颜色，默认空，#333。</p>
        </li>
        <li class="items-link">
          <h5>items.link</h5>
          <label>类型：Object</label>
          <span>默认值：空</span>
          <p>作用：设置单元格的路由跳转地址，格式与vue-router的格式一样。</p>
        </li>
        <h4>事件</h4>
        <li class="callBack">
          <h5>callBack</h5>
          <label>参数：index，item</label>
          <span>触发时机：每一次单击单元格时触发。</span>
          <p>作用：单击某个单元格后发起回调时间给调用者，以便让调用者做出相对的响应措施。如跳转到某个页面或执行某些代码。参数index是当前单击单元格的索引，表示单击了哪一个单元格。参数item是当前单击单元格的数据信息，包含了原items数据的内容。</p>
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
