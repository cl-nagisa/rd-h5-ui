<!-- by fl -->
<template>
  <div class="fl-dataListUI-wrapper">
    <div class="fl-dataListUI-model">
      <ul v-if="data.items" class="items">
        <li v-for="(item, index) in data.items"
            :style="{
            'width': (index + 1) % itemsColumns === 0 ? columnWidthNth + '%' : columnWidth + '%',
            'font-size': item.size + 'px',
            'color': item.color,
            'text-align': item.align
            }"
            v-html="item.value"></li>
      </ul>
      <ul v-if="data.list" class="list">
        <li v-for="(item, index) in data.list">
          <div class="list-item"
               :style="{
              'font-size': item.titleSize + 'px',
              'color': item.titleColor,
              }"
               v-html="item.title"></div>
          <div class="list-item"
               :style="{
              'font-size': item.valueSize + 'px',
              'color': item.valueColor,
              }"
               v-html="item.value"></div>
        </li>
      </ul>
      <ul v-if="data.buttons" class="buttons">
        <li v-for="(item, index) in data.buttons"
            :style="{
            'width': item.width + 'px',
            'font-size': item.size + 'px',
            'color': item.color,
            'background-color': item.bgColor,
            'border-color': item.bdColor
            }"
            v-html="item.value"
            @click="emitClick(index, item)"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      itemsAlign: { // 标题部分的排版风格，horizontal水平排版，vertical垂直排版，默认horizontal
        type: String,
        default: 'horizontal'
      },
      itemsColumns: { // 标题部分的列数，horizontal水平排版下默认2列可配置，vertical垂直排版下默认1列不可配置
        type: Number,
        default: 2
      },
      data: {
        type: Object,
        default: () => {
          return {
            items: [], // 标题部分数据内容，可配置样式包括：value文案内容支持html文本形式、size字体大小默认14px、color文字颜色默认#333，align对齐方式默认左对齐
            list: [], // 正文部分数据内容，子属性包括title对象和value对象
            buttons: [] // 按钮部分数据内容，对多放4个按钮，可配置样式包括：value文案内容支持html文本形式、width按钮宽度默认60px、size字体大小默认12px、color文字颜色默认#999、bgColro背景色默认#fff，bdColor边框色默认#ddd，href页面跳转地址默认空
          };
        }
      }
    },
    computed: {
      // 根据配置的列数，计算每列的宽度
      columnWidth() {
        if (this.itemsAlign === 'horizontal') {
          return this.toFiexed(100 / this.itemsColumns);
        } else {
          return 100;
        }
      },
      // 如果是奇数列，计算每行尾列的宽度，已确保每一行所有单元格的宽度加起来正好100%的宽度
      columnWidthNth() {
        if (this.itemsAlign === 'horizontal') {
          return 100 - this.toFiexed(100 / this.itemsColumns) * (this.itemsColumns - 1);
        } else {
          return 100;
        }
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
      // 点击效果
      emitClick(index, item) {
        if (item.href) { // 设置href时，跳转到对应href地址
          this.$router.push(item.href);
        } else { // 无任何设置，仅派发点击事件，交由调用者开发使用
          this.$emit('clicked', index, item);
        }
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "NormalListB.sass";
</style>
