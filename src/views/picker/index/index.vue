<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>下拉选择器</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'pickerDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pickerApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pickerVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
