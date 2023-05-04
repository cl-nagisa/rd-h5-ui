<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>Navbar导航条</h3>
      <label>1.0.0</label>
      <span>封磊</span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'navbarDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'navbrApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'navbarVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "../../../assets/sass/index.sass";
</style>
