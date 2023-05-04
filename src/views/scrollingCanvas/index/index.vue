<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>滚动画布</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'scrollingCanvasDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'scrollingCanvasApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'scrollingCanvasVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "../../../assets/sass/index.sass";
</style>
