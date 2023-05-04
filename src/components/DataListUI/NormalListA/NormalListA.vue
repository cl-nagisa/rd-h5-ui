<!-- by fl -->
<template>
  <div class="fl-dataListUI-wrapper">
    <div class="fl-dataListUI-model"
         :class="{ 'isLink': isLink && !isDropDown }"
         :style="{
         'background-color': bgColor,
         'height': height + 'px'
         }"
         @click="emitClick">
      <img v-if="img.src" class="icon"
           :src="img.src"
           :style="{
           'width': img.width + 'px',
           'height': img.height + 'px'
           }">
      <div class="items"
           :class="{ 'no-wrap': items.length === 2 && itemB.position === 'right' }"
           :style="{
           'margin-left': img.src ? img.width + 10 + 'px' : '',
           }">
        <template v-if="items.length !== 3">
          <div v-for="(item, index) in items" class="item"
               :style="{
               'width': items.length >= 3 ? '50%' : '100%',
               'margin-right': isLink ? 'calc(5% + 12px + 10px)' : '',
               'padding-right': isLink ? '' : '5%',
               'font-size': item.size + 'px',
               'color': item.color,
               'text-align': items.length === 2 && item.position === 'right' ? 'right' : item.align
               }" v-html="item.value"></div>
        </template>
        <template v-else>
          <div class="item-block">
            <div v-for="(item, index) in items" v-if="index < 2" class="item"
                 :style="{
                 'margin-right': isLink ? 'calc(5% + 12px + 10px)' : '',
                 'font-size': item.size + 'px',
                 'color': item.color,
                 'text-align': item.align
                 }" v-html="item.value"></div>
          </div>
          <div v-for="(item, index) in items" v-if="index === 2" class="item"
            :style="{
             'width': isLink ? 'auto' : '50%',
             'margin-right': isLink ? 'calc(5% + 12px + 10px)' : '',
             'padding-right': isLink ? '' : '5%',
             'font-size': item.size + 'px',
             'color': item.color,
             'text-align': item.align
             }" v-html="item.value"></div>
        </template>
      </div>
      <img v-if="isLink && isDropDown" class="isDropDown" src="../images/isLink.png"
           :class="{ 'show': dropDownShow }">
    </div>
    <div v-if="isDropDown" ref="more" class="fl-dataListUI-more">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        dropDownShow: false // 显示展现隐藏内容，true展现
      };
    },
    props: {
      img: {
        type: Object,
        default: () => {
          return {
            src: '', // 图片路劲
            width: '', // 图片宽度
            height: '' // 图片高度
          };
        }
      },
      itemA: {
        type: Object,
        default: () => {
          return {
            value: '', // 文案内容，支持html文本形式
            size: '', // 字体大小，默认12px
            color: '', // 字体颜色，默认#333
            align: '' // 对齐方式，默认left
          };
        }
      },
      itemB: {
        type: Object,
        default: () => {
          return {
            value: '',
            size: '',
            color: '',
            align: '',
            position: 'bottom'
          };
        }
      },
      itemC: {
        type: Object,
        default: () => {
          return {
            value: '',
            size: '',
            color: '',
            align: ''
          };
        }
      },
      itemD: {
        type: Object,
        default: () => {
          return {
            value: '',
            size: '',
            color: '',
            align: ''
          };
        }
      },
      href: { // 跳转链接地址
        type: Object,
        default: () => {
          return {};
        }
      },
      bgColor: { // 背景颜色，默认白色#fff
        type: String,
        default: ''
      },
      height: { // 整体高度，默认60px
        type: Number,
        default: 60
      },
      isLink: { // 是否显示右箭头图标
        type: Boolean,
        default: false
      },
      isDropDown: { // 是否可以展现隐藏内容
        type: Boolean,
        default: false
      }
    },
    computed: {
      items() {
        let res = [];
        if (this.itemA.value) {
          res.push(this.itemA);
        }
        if (this.itemB.value) {
          res.push(this.itemB);
        }
        if (this.itemC.value) {
          res.push(this.itemC);
        }
        if (this.itemD.value) {
          res.push(this.itemD);
        }
        return res;
      }
    },
    methods: {
      // 点击效果
      emitClick() {
        if (this.href.name) { // 设置isLink时，跳转到对应href地址
          this.$router.push(this.href);
        } else if (this.isDropDown) { // 设置isDropDown时，实现展现隐藏内容功能，且派发点击事件
          this.dropDownShowAnimation();
          this.dropDownShow = !this.dropDownShow;
          this.$emit('clicked', this.dropDownShow);
        } else { // 无任何设置，仅派发点击事件，交由调用者开发使用
          this.$emit('clicked');
        }
      },
      // 展现隐藏内容功能动画
      dropDownShowAnimation() {
        this.$refs.more.style.height = this.dropDownShow ? 0 : this.$refs.more.children[0].clientHeight + 'px';
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "NormalListA.sass";
</style>
