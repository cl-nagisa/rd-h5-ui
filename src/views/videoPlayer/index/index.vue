<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>视频播放器</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'videoPlayerDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'videoPlayerApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'videoPlayerVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
