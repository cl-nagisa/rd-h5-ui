<!-- by fl -->
<template>
  <div class="page">
    <div class="title">
      <h3>日历</h3>
      <label>1.0.0</label>
      <span></span>
    </div>
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'simpleCalendarDemo' }">demo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'simpleCalendarApi' }">api</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'simpleCalendarVersion' }">version</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "index.sass";
</style>
