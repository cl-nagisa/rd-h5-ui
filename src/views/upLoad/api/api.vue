<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('length')">length</li>
         <li @click="toPosition('size')">size</li>
         <li @click="toPosition('value')">value</li>
         <li @click="toPosition('picList')">picList</li>
         <h5>事件</h5>
         <li @click="toPosition('error')">error</li>
         <li @click="toPosition('upLoad')">upLoad</li>
         <li @click="toPosition('toLook')">toLook</li>
         <li @click="toPosition('delete')">delete</li>
         <h5>方法</h5>
         <li @click="toPosition('upLoadSucc')">upLoadSucc</li>
         <li @click="toPosition('upLoadFail')">upLoadFail</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="length">
          <h5>length</h5>
          <label>类型：Number</label>
          <span>默认值：1</span>
          <p>作用：最大上传图片张数，默认1张。</p>
        </li>
        <li class="size">
          <h5>size</h5>
          <label>类型：Number</label>
          <span>默认值：5</span>
          <p>作用：最大上传大小，默认5M。</p>
        </li>
        <li class="value">
          <h5>value</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：已上传图片列表。在调用组件时用v-model进行绑定。</p>
        </li>
        <li class="picList">
          <h5>picList</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：预览图片列表，用于生成photoSwipe需要的item参数。</p>
        </li>
        <h4>事件</h4>
        <li class="error">
          <h5>error</h5>
          <label>参数：type</label>
          <span>触发时机：目前只会在上传图片大小超过设置时才会触发。</span>
          <p>作用：目前type只有一个参数‘size’，暂无意义；触发后通知调用者让其以弹窗或其它形式报异常信息。</p>
        </li>
        <li class="upLoad">
          <h5>upLoad</h5>
          <label>参数：this, fliles</label>
          <span>触发时机：上传图片并符合大小等限制条件后触发。</span>
          <p>作用：将当前上传成功的图片的file对象派发给调用者，供调用者调用上传接口或其它使用。</p>
        </li>
        <li class="toLook">
          <h5>toLook</h5>
          <label>参数：index</label>
          <span>触发时机：单击某张已上传图片时触发。</span>
          <p>作用：派发当前图片在picList数组中的下标索引给调用者，用于预览图片时使用。</p>
        </li>
        <li class="delete">
          <h5>delete</h5>
          <label>参数：index</label>
          <span>触发时机：删除某张图片时触发。</span>
          <p>作用：派发当前图片在picList数组中的下标索引给调用者。</p>
        </li>
        <h4>方法</h4>
        <li class="upLoadSucc">
          <h5>upLoadSucc</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：当前图片上传成功，标记成功并显示。</p>
        </li>
        <li class="upLoadFail">
          <h5>upLoadFail</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：当前图片上传失败，不进行任何操作。</p>
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
