<!-- by fl -->
<template>
  <div class="page">
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'gallery' }">相册情景</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'article' }">文章情景</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
