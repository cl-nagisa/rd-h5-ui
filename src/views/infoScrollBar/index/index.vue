<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>信息轮播条</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'infoScrollBarDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'infoScrollBarApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'infoScrollBarVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
