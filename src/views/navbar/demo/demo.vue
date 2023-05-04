<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>普通固定导航条</label>
      <nav-bar v-model="defaultIndex1" :menuList="menuList1"></nav-bar>
    </div>
    <div class="demo">
      <label>不同动画导航条</label>
      <nav-bar v-model="defaultIndex2" :menuList="menuList2" :animation="currentAnimation"></nav-bar>
      <div class="button">
        <span v-for="(item, index) in animation" :class="{ 'current': item === currentAnimation }" @click="currentAnimation = item">{{ item }}</span>
      </div>
    </div>
    <div class="demo">
      <label>水平滚动导航条</label>
      <nav-bar class="nav-bar" v-model="defaultIndex3" :menuList="menuList3" animation="rabbit" :isScroll="true"></nav-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavBar from '../../../components/Navbar/Navbar.vue'; // Navbar导航条条组件

  export default {
    data() {
      return {
        defaultIndex1: 0,
        defaultIndex2: 0,
        defaultIndex3: 0,
        menuList1: [ '菜单1', '菜单2', '菜单3', '菜单4' ],
        menuList2: [ '菜单1', '菜单2', '文字较多的菜单3' ],
        currentAnimation: 'rabbit',
        animation: [ 'rabbit', 'giraffe', 'shark' ],
        menuList3: [ '菜单1', '菜单2', '菜单3', '菜单4', '菜单5', '菜单6', '菜单7', '菜单8', '菜单9' ]
      };
    },
    components: { NavBar }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
