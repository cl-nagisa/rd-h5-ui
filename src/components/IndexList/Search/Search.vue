<!-- by fl -->
<template>
  <div class="fl-search">
    <div class="fl-search-button" @click="toShow"></div>
    <transition :name="'fl-' + transitionName">
      <div v-show="isShow" class="fl-search-wrapper">
        <div class="fl-search-con">
          <div class="fl-search-con-div">
            <input type="text" placeholder="搜索关键字" v-model="key">
            <i class="fl-search-clear" @click="claer"></i>
            <b class="fl-search-cancel" @click="toHide">取消</b>
          </div>
        </div>
        <div class="fl-search-result-wrapper" ref="resultWrapper">
          <ul>
            <li v-for="(item, index) in result" @click="select(item)">{{ item }}</li>
            <li v-if="noneResultFlag" class="none">暂无结果</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import pinyin from '../assets/js/pinyin.js'; // 汉字转拼音js

  export default {
    data() {
      return {
        key: '', // 搜索关键字
        resultScroll: '', // 搜索结果列表better-scroll实例变量
        isShow: false, // 显示/关闭搜索功能组件
        noneResultFlag: false, // 是否搜索到数据，false 无结果
        result: [] // 搜索结果数据
      };
    },
    props: {
      transitionName: { // 显示/关闭搜索功能组件时的动画效果，共9种：fade、top、bottom、left、right、topleft、topRight、bottomLeft、bottomRight，默认right
        type: String
      },
      slots: { // 数据源
        type: Array,
        default: []
      }
    },
    mixins: [ pinyin ],
    computed: {
      // 生成一个带pinyin对象的映射数据，用于搜索
      slotsPinyin() {
        let i, j;
        let res = [];
        for (i = 0; i < this.slots.length; i++) {
          if (this.slots[i].items.length > 0) {
            for (j = 0; j < this.slots[i].items.length; j++) {
              let temp = {
                value: this.slots[i].items[j],
                pinyin: this.convertPinyin(this.slots[i].items[j])
              };
              res.push(temp);
            }
          }
        }
        return res;
      }
    },
    watch: {
      // 监听搜索功能组件的开启与关闭，每次开启都会创建或重置better-scroll实例，每次关闭都会停止所有列表的滚动
      isShow(val) {
        if (val) {
          this._initScroll();
        } else {
          if (this.resultScroll) {
            this.resultScroll.stop();
          }
        }
      },
      // 监听输入的关键字，实时查询结果
      key(val) {
        this.toSearch(val.toLowerCase());
      }
    },
    methods: {
      // 初始化better-scroll实例
      _initScroll() {
        this.$nextTick(() => {
          if (!this.resultScroll) {
            this.resultScroll = new BScroll(this.$refs.resultWrapper, {
              bounce: false,
              click: true,
              probeType: 2
            });
          } else {
            this.resultScroll.refresh();
          }
        });
      },
      // 根据关键字搜索结果
      toSearch(key) {
        this.noneResultFlag = false;
        this.result = [];
        if (key !== '') {
          let i;
          for (i = 0; i < this.slotsPinyin.length; i++) {
            if (this.slotsPinyin[i].value.indexOf(key) >= 0 || this.slotsPinyin[i].pinyin.indexOf(key) >= 0) {
              this.result.push(this.slotsPinyin[i].value);
            }
          }
          if (this.result.length <= 0) {
            this.noneResultFlag = true;
          }
        }
        this.resultScroll.refresh();
      },
      // 在搜索结果中选择了某一项
      select(value) {
        this.isShow = false;
        this.$emit('select', value); // 向调用者派发选择事件与文本内容
      },
      // 关闭搜索功能组件
      toShow() {
        this.isShow = true;
      },
      // 开启搜索功能组件
      toHide() {
        this.isShow = false;
      },
      // 清除文本框输入内容
      claer() {
        this.key = '';
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Search.sass";
</style>
