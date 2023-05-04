<!-- by fl -->
<template>
  <div class="fl-cell-wrapper" :style="{  'background-color': bgColor ? bgColor : '' }">
    <ul ref="cellWrapper" :class="border">
      <li v-for="(item, index) in items"
          class="aui-right aui-bottom"
          :class="side(index)"
          :style="{
          'width': (index + 1) % columns === 0 ? columnWidthNth + '%' : columnWidth + '%',
          'height': height + 'px',
          'background-color': item.bgColor ? item.bgColor : '#fff'
          }"
          @click="href(item.link, index, item)">
        <div class="fl-cell-item">
          <img v-if="item.icon" class="icon"
               :src="item.icon"
               :style="{
               'width': item.iconWidth ? item.iconWidth + 'px' : '24px',
               'height': item.iconHeight ? item.iconHeight + 'px' : '24px'
               }">
          <div v-if="item.text" class="text"
               :style="{
               'font-size': item.textSize + 'px',
               'color': item.textColor
              }"
               v-html="item.text"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      columns: { // 列数，默认3列
        type: Number,
        default: 3
      },
      height: { // 列高，单位px，默认80
        type: Number,
        default: 80
      },
      border: { // 单元格边框样式，有“all”、“floor”两种，默认无边框
        type: String,
        default: ''
      },
      bgColor: { // 单元格整体背景色，默认白色
        type: String,
        default: ''
      },
      items: { // 单元格数据
        type: Array
      }
    },
    computed: {
      // 根据配置的列数，计算每列的宽度
      columnWidth() {
        return this.toFiexed(100 / this.columns);
      },
      // 如果是奇数列，计算每行尾列的宽度，已确保每一行所有单元格的宽度加起来正好100%的宽度
      columnWidthNth() {
        return 100 - this.toFiexed(100 / this.columns) * (this.columns - 1);
      }
    },
    methods: {
      // 保留N位小数，不四舍五入
      toFiexed(val, len = 2) {
        if (isNaN(val) || len < 1) {
          return false;
        }
        val = val.toString();
        if (val.indexOf('.') >= 0) {
          return parseFloat(val.substr(0, val.indexOf('.') + len + 1));
        } else {
          return parseFloat(val);
        }
      },
      // 单元格单击响应
      href(obj, index, item) {
        if (obj) {
          this.$router.push(obj);
        } else {
          this.$emit('callBack', index, item);
        }
      },
      // 通过计算来给每个单元格进行边框样式的调整
      side(index) {
        let currentItem = index + 1; // 当前单元格
        let totalItems = this.items.length; // 单元格总数
        let eachRowItems = this.columns; // 每行单元格数
        let rows = Math.ceil(totalItems / eachRowItems); // 行数
        if (currentItem === eachRowItems * rows) {
          return 'last';
        } else if (currentItem > (eachRowItems * (rows - 1))) {
          return 'foot';
        } else if (currentItem === eachRowItems || currentItem % eachRowItems === 0) {
          return 'trunk';
        }
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "HCell.sass";
</style>
