<!-- by fl -->
<template>
  <div class="page">
    <ul class="menu">
      <li @click="toShowNameList">人员名单-按拼音</li>
      <label>所选结果：{{ nameListSelectValue }}</label>
      <li @click="toShowPostList">人员名单-按岗位</li>
      <label>所选结果：{{ postListSelectValue }}</label>
    </ul>
    <index-list v-model="isNameListShow" :slots="nameSlots" :isHeader="false" isAutoFirstChat isOrderByFirstChat @select="nameListSelect"></index-list>
    <index-list v-model="isPostListShow" :slots="postSlots" title="人员名单-按岗位" isCatalog isSearch @select="postListSelect"></index-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import listByName from './listByName/listByName.js';
  import listByPost from './listByPost/listByPost.js';
  import IndexList from '../../../components/IndexList/IndexList.vue';

  export default {
    mixins: [ listByName, listByPost ],
    components: { IndexList },
    created() {
      this._initData();
    },
    methods: {
      _initData() {
        this.$http.get('/api/dataJson').then((res) => {
          this._initNameSortData(res.data.data.byName);
          this._initPostSortData(res.data.data.byWork);
        });
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
