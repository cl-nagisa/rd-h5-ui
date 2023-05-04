<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>索引列表</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'indexListDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'indexListApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'indexListVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
