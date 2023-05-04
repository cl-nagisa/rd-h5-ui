<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>单元格菜单</label>
      <h-cell :items="cellList" border="all" @callBack="getCall"></h-cell>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HCell from '../../../components/HCell/HCell.vue'; // 引入水平单元格组件

  export default {
    data() {
      return {
        cellList: [
          {
            icon: require('../../../assets/images/icon/1.png'),
            text: '菜单1',
            link: { name: 'index' }
          },
          {
            icon: require('../../../assets/images/icon/2.png'),
            text: '菜单2'
          },
          {
            icon: require('../../../assets/images/icon/3.png'),
            text: '菜单3'
          },
          {
            icon: require('../../../assets/images/icon/4.png'),
            text: '菜单4'
          },
          {
            icon: require('../../../assets/images/icon/5.png'),
            text: '菜单5'
          },
          {
            icon: require('../../../assets/images/icon/6.png'),
            text: '菜单6'
          },
          {
            icon: require('../../../assets/images/icon/1.png'),
            text: '菜单7'
          },
          {
            icon: require('../../../assets/images/icon/2.png'),
            text: '菜单8'
          },
          {
            icon: require('../../../assets/images/icon/3.png'),
            text: '菜单9'
          }
        ]
      };
    },
    components: { HCell },
    methods: {
      // 对单击的某个单元格做出回应
      getCall(index, item) {
        window.alert(item.text);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
