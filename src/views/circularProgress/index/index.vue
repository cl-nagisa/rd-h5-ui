<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>圆形进度圈</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'circularProgressDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'circularProgressApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'circularProgressVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "../../../assets/sass/index.sass";
</style>
