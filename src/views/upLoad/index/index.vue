<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>图片上传预览</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'upLoadDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'upLoadApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'upLoadVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "../../../assets/sass/index.sass";
</style>
