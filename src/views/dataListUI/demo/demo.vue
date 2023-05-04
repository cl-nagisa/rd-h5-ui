<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>类型一</label>
      <normal-list-a
        :height="40"
        :itemA="{ value: '标题' }"
        :href="{ name: 'index' }"
        isLink>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型二</label>
      <normal-list-a
        :height="50"
        :itemA="{ value: '标题' }"
        :itemB="{ value: '描述', color: '#999', position: 'right' }"
        :href="{ name: 'index' }"
        isLink>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型三</label>
      <normal-list-a
        :itemA="{ value: '标题' }"
        :itemB="{ value: '描述', color: '#999' }"
        :href="{ name: 'index' }"
        isLink>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型四</label>
      <normal-list-a
        :img="{ src: require('../../../assets/images/icon/1.png'), width: 30, height: 30 }"
        :itemA="{ value: '标题', size: 14 }"
        :itemB="{ value: '描述', color: '#999' }"
        isLink
        isDropDown>
        <div class="more">在这里添加自定义内容，样式也可以自定义，以显示更多隐藏内容。</div>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型五</label>
      <normal-list-a
        :itemA="{ value: '标题' }"
        :itemB="{ value: '描述', color: '#999' }"
        :itemC="{ value: '单位', color: '#f95a28', align: 'right' }"
        isDropDown>
        <div class="more">在这里添加自定义内容，样式也可以自定义，以显示更多隐藏内容。</div>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型六</label>
      <normal-list-a
        :itemA="{ value: '标题' }"
        :itemB="{ value: '单位', color: '#f95a28', align: 'right' }"
        :itemC="{ value: '描述', color: '#999' }"
        :itemD="{ value: '时间', color: '#999', align: 'right' }"
        isDropDown>
        <div class="more">在这里添加自定义内容，样式也可以自定义，以显示更多隐藏内容。</div>
      </normal-list-a>
    </div>
    <div class="demo">
      <label>类型七</label>
      <normal-list-b @clicked="testClick"
        :data="{
         items: [
          { value: '名称' },
          { value: '日期', align: 'right' },
          { value: '名称' },
          { value: '日期', align: 'right' },
         ],
         list: [
          { title: '名称', value: '重要参数', valueColor: '#f95a28' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' }
         ],
         buttons: [
          { value: '确认', color: '#f95a28', bdColor: '#f95a28' },
          { value: '取消' },
          { value: '充值', color: '#fff', bgColor: '#981bf3', bdColor: '#981bf3', href: { name: 'index' } },
          { value: '提现', color: '#fff', bgColor: '#46d80b', bdColor: '#46d80b' }
         ]
      }"></normal-list-b>
    </div>
    <div class="demo">
      <label>类型八</label>
      <normal-list-b :itemsColumns="3" @clicked="testClick"
        :data="{
         items: [
          { value: '名称' },
          { value: '名称', align: 'center' },
          { value: '名称', align: 'right' },
          { value: '日期' },
          { value: '日期', align: 'center' },
          { value: '日期', align: 'right' }
         ],
         list: [
          { title: '名称', value: '重要参数', valueColor: '#f95a28' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' }
         ],
         buttons: [
          { value: '冈崎朋也', width: '80' },
          { value: '伊吹风子', width: '80' },
          { value: '坂上智代', width: '80' }
         ]
      }"></normal-list-b>
    </div>
    <div class="demo">
      <label>类型九</label>
      <normal-list-b itemsAlign="vertical"
        :data="{
         items: [
          { value: '名称' },
          { value: '日期' }
         ],
         list: [
          { title: '名称', value: '重要参数', valueColor: '#f95a28' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' },
          { title: '名称', value: '一般参数' }
         ]
      }"></normal-list-b>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NormalListA from '../../../components/DataListUI/NormalListA/NormalListA.vue';
  import NormalListB from '../../../components/DataListUI/NormalListB/NormalListB.vue';

  export default {
    components: { NormalListA, NormalListB },
    methods: {
      testClick(index, item) {
        window.alert('点击了"' + item.value + '"按钮');
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
