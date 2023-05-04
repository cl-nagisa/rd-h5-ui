<!-- by fl -->
<template>
  <div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'navbar' }">Navbar导航条</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'hCell' }">水平单元格</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'dataListUI' }">常用数据列表</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'inputField' }">常用表单控件</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'photoSwipe' }">PhotoSwipe图片查看器</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'infoScrollBar' }">信息轮播条</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'indexList' }">索引列表</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'picker' }">下拉选择器</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'circularProgress' }">圆形进度圈</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'progressBar' }">水平进度条</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'scrollingCanvas' }">滚动画布</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'flow' }">事件流程图</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'upLoad' }">图片上传预览</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'calendar' }">日历</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'simpleCalendar' }">简单日历</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'videoPlayer' }">视频播放器</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
