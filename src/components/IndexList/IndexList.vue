<!-- by fl -->
<template>
  <div class="fl-indexList" @touchmove.prevent @mousewheel.prevent>
    <transition :name="'fl-' + transitionName">
      <div v-show="isShow" class="fl-indexList-container">
        <div v-if="isHeader" class="fl-indexList-header">
          <div class="fl-indexList-back" @click.self="toHide"></div>
          {{ title }}
        </div>
        <div class="fl-indexList-wrapper" :class="{ 'is-header': isHeader }">
          <div class="fl-list-wrapper" ref="listWrapper">
            <div class="scroll-content">
              <ul class="ul-group">
                <li v-for="(itemGroup, indexGroup) in data" class="li-group" ref="listGroup">
                  <h5>{{ itemGroup.name }}</h5>
                  <ul class="ul-item">
                    <li v-for="(item, index) in itemGroup.items" class="li-item" @click="select(item)">{{ item }}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div v-show="fixedTitle" class="fl-indexList-fixed" ref="fixed">{{ fixedTitle }}</div>
          <div v-if="isOrderByFirstChat" class="fl-list-nav" ref="navWrapper">
            <ul>
              <li v-for="(item, index) in data" :class="{ 'current' : fixedTitle === item.name }" @click="toPosition(index)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <catalog v-if="isCatalog" :slots="data" :currentIndex="currentIndex" @toPosition="toPosition"></catalog>
        <search v-if="isSearch" ref="search" :transitionName="searchTransitionName" :slots="data"  @select="select"></search>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Catalog from './Catalog/Catalog.vue'; // 目录功能组件
  import Search from './Search/Search.vue'; // 搜索功能组件
  import pinYin from './assets/js/pinyin.js'; // 汉字转拼音js

  const DEFAULT_HEIGHT = 0; // .fl-indexList-fixed的默认高度，在后续相关计算中使用
  const NAME_HEIGHT = 42; // .fl-indexList-fixed实际高度，在后续相关计算中使用

  export default {
    data() {
      return {
        contentScroll: '', // 主体数据滚动块better-scroll实例变量
        navScroll: '', // 右侧按字母排序滚动快better-scroll实例变量
        fixedTop: '', // .fl-indexList-fixed距离顶部的距离
        currentIndex: 0, // 当前所选组的数组下标
        scrollY: -1, // 当前主体数据滚动块的垂直滚动数值
        diff: -1, // 当前所选组的剩余可见滑动距离
        isShow: false, // 显示/关闭Index-List组件
        data: [], // 数据源
        listHeight: [] // 每一个组的高度集合
      };
    },
    props: {
      transitionName: { // 显示/关闭Index-List组件时的动画效果，共9种：fade、top、bottom、left、right、topleft、topRight、bottomLeft、bottomRight，默认right
        type: String,
        default: 'right'
      },
      title: { // 顶部导航栏的标题文案
        type: String,
        default: '标题'
      },
      value: { // 用来开启或关闭Index-List组件的开关，可以是任意自定义的变量名。在调用组件时用v-model进行绑定
        type: Boolean,
        default: false
      },
      isHeader: { // 是否显示顶部导航栏，默认显示
        type: Boolean,
        default: true
      },
      isAutoFirstChat: { // 是否开启自动由组件来转换原数据为组件可用格式数据，在按首字母汉字拼音排序时可用，默认不开启
        type: Boolean,
        default: false
      },
      isOrderByFirstChat: { // 是否开启按首字母汉字拼音排序功能，一般用在通讯录场景中，默认不开启
        type: Boolean,
        default: false
      },
      isCatalog: { // 是否开启目录功能，默认不开启
        type: Boolean,
        default: false
      },
      isSearch: { // 是否开启搜索查询功能，默认不开启
        type: Boolean,
        default: false
      },
      searchTransitionName: { // 显示/关闭搜索查询组件时的动画效果，同transitionName
        type: String,
        default: 'right'
      },
      slots: { // 原数据源
        type: Array,
        default: []
      }
    },
    mixins: [ pinYin ],
    components: { Catalog, Search },
    computed: {
      // 当前选择组的文本内容
      fixedTitle() {
        if (this.scrollY > -DEFAULT_HEIGHT) {
          return '';
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].name : '';
      }
    },
    watch: {
      value(val) {
        this.isShow = val;
      },
      // 监听Index-List组件的开启与关闭，每次开启都会创建或重置better-scroll实例，每次关闭都会停止所有列表的滚动
      isShow(val) {
        this.$emit('input', val);
        if (val) {
          if (this.isAutoFirstChat) {
            this.changeSlots(); // 如果开启isAutoFirstChat参数，则自动对原数据源进行解析
          } else {
            this.data = this.slots;
          }
          this._initScroll();
          if (this.isSearch) {
            this.$refs.search.key = ''; // 如果开启isSearch参数，则在每次显示Index-List组件时将Search组件的key值置空
          }
        } else {
          if (this.contentScroll) {
            this.contentScroll.stop();
          }
          if (this.navScroll) {
            this.navScroll.stop();
          }
        }
      },
      // 通过监听diff值来判断当前距离上一组或下一组数据数据的距离来改变.fl-indexList-fixed的显示
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < NAME_HEIGHT) ? newVal - NAME_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return;
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      },
      // 通过监听scrollY值来判断当前处于哪一组数据块中，并实时更新相关数据
      scrollY(newY) {
        const listHeight = this.listHeight;
        if (newY > -DEFAULT_HEIGHT) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i;
            this.diff = height2 + newY;
            return;
          }
        }
        this.currentIndex = listHeight.length - 2;
      }
    },
    methods: {
      // 转换原数据为组件可用格式数据
      changeSlots() {
        let data = this.slots;
        let slostList = []; // 用于存储转换结果
        let groupList = []; // 用于存储转换过程中生成的组数据
        let groupTempList = []; // 用户存储转换过程中的临时数据
        // 对源数据进行遍历，取出每一项的首字符并转换为拼音，生成原数据的拼音格式数组，放入groupTempList中
        for (let i = 0; i < data.length; i++) {
          let firstChat = this.convertPinyin(data[i].substring(0, 1)).substring(0, 1);
          groupTempList.push(firstChat.toUpperCase());
        }
        // 对groupTempList数组进行遍历，去除重复项，放入groupList中
        for (let j = 0; j < groupTempList.length; j++) {
          if (!this.contains(groupList, groupTempList[j])) {
            groupList.push(groupTempList[j]);
          }
        }
        // 对groupList数组进行按字母排序
        groupList.sort();
        // 将groupList数组的每一项作为一个组，即放入slostList中的name对象
        for (let k = 0; k < groupList.length; k++) {
          slostList[k] = {};
          slostList[k].name = groupList[k];
          slostList[k].items = [];
        }
        // 根据每一组的首字母，对原数据进行筛选整理，排号入座
        for (let m = 0; m < data.length; m++) {
          let firstChat = this.convertPinyin(data[m].substring(0, 1)).substring(0, 1).toUpperCase();
          for (let n = 0; n < slostList.length; n++) {
            if (slostList[n].name === firstChat) {
              slostList[n].items.push(data[m]);
              break;
            }
          }
        }
        this.data = slostList;
      },
      // 初始化部分数据与实例
      _initScroll() {
        this.$nextTick(() => {
          this._createScroll();
          this._calculateHeight();
        });
      },
      // 初始化better-scroll实例
      _createScroll() {
        if (!this.contentScroll) {
          this.contentScroll = new BScroll(this.$refs.listWrapper, {
            bounce: false,
            click: true,
            probeType: 2
          });
          this.contentScroll.on('scroll', (pos) => {
            this.scroll(pos);
          });
        } else {
          this.contentScroll.refresh();
        }
        if (this.isOrderByFirstChat) {
          if (!this.navScroll) {
            this.navScroll = new BScroll(this.$refs.navWrapper, {
              bounce: false,
              click: true,
              probeType: 2
            });
          } else {
            this.navScroll.refresh();
          }
        }
      },
      // 计算每一组的相对滚动高度
      _calculateHeight() {
        const list = this.$refs.listGroup;
        this.listHeight = [];
        let height = DEFAULT_HEIGHT;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      // 记录当前better-scroll实例的滚动位置
      scroll(pos) {
        this.scrollY = pos.y;
      },
      // 从目录组件中指定滚动到当前better-scroll实例的某个dom位置
      toPosition(index) {
        this.currentIndex = index;
        this.scrollTo(this.$refs.listGroup[index]);
      },
      // 确认选择了某一项
      select(value) {
        let firtDom = this.$refs.listGroup;
        let secdDom = '';
        let i, j;
        let breakFlag = false;
        for (i = 0; i < firtDom.length; i++) {
          secdDom = firtDom[i].childNodes[2].childNodes;
          for (j = 0; j < secdDom.length; j++) {
            if (secdDom[j].innerText === value) {
              if (j > 0) {
                j = j - 1;
                this.contentScroll.scrollToElement(secdDom[j]);
              } else {
                this.contentScroll.scrollToElement(firtDom[i]);
              }
              this.scrollY = this.contentScroll.y;
              breakFlag = true;
              break;
            }
          }
          if (breakFlag) {
            break;
          }
        }
        this.isShow = false;
        this.$emit('select', value); // 派发所选事件及文本内容
      },
      // 指定滚动到当前better-scroll实例的某个dom位置
      scrollTo(dom) {
        this.contentScroll.scrollToElement(dom, 300);
        this.scrollY = this.contentScroll.y;
      },
      // 关闭Index-List组件
      toHide() {
        this.isShow = false;
      },
      // 判断一个数组中是否含有某个值
      contains(arr, obj) {
        let i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "IndexList.sass";
</style>
