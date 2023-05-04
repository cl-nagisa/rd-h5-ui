<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>PhotoSwipe图片查看器</h3>
      <label>4.1.2</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'photoSwipeDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'photoSwipeApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'photoSwipeVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
