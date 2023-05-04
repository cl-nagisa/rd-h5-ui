<!-- by fl -->
<template>
  <div class="fl-picker" @touchmove.prevent @mousewheel.prevent>
    <div v-show="isShow" class="fl-modal" @click="toHide"></div>
    <transition name="fl-picker-slide-bottom">
      <div v-show="isShow" class="fl-picker-container">
        <div class="fl-picker-toolbar">
          <span class="fl-picker-toolbar-cancel"><i @click="cancel">取消</i></span>
          <span class="fl-picker-toobar-title">{{ title }}</span>
          <span class="fl-picker-toolbar-confirm"><i @click="confirm">确认</i></span>
        </div>
        <div class="fl-picker-items">
          <template v-for="(slotItem, slotIndex) in slots">
            <div v-if="!slotItem.divider" class="fl-picker-slot"
                 :id="'wheelWrapper' + slotIndex"
                 :ref="'wheelWrapper' + slotIndex"
                 :style="{
                 'flex': slotItem.flex,
                 'width': slotItem.width,
                 'height': contentHeight + 'px',
                 'text-align' : slotItem.textAlign ? slotItem.textAlign : 'center'
                 }">
              <ul class="wheel-scroll" :style="{ 'margin-top': contentPaddingTop + 'px' }">
                <li v-for="(valueItem, valueIndex) in slotItem.values" class="wheel-item"
                    :class="{ 'fl-picker-selected': pickerSelectedIndex[slotIndex] == valueIndex }"
                    :style="{
                    'height': itemHeight + 'px',
                    'line-height': itemHeight + 'px'
                    }">{{ valueItem }}</li>
              </ul>
            </div>
            <div v-else class="fl-picker-slot-divider"
                 :style="{
                 'flex': slotItem.flex,
                 'width': slotItem.width,
                 'height': contentHeight + 'px',
                 'line-height': contentHeight + 'px',
                 'text-align' : slotItem.textAlign ? slotItem.textAlign : 'center'
                 }">{{ slotItem.content ? slotItem.content : '' }}</div>
          </template>
          <div class="fl-picker-center-highlight"
               :style="{
               'height': itemHeight + 'px',
               'margin-top': -itemHeight / 2 + 'px'
               }"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        isShow: false, // 显示/关闭picker
        wheels: [], // better-scroll所new出来滚动列表集合
        pickerSelectedIndex: [], // 当前各个滚动列表所选择值的索引
        pickerSelectedConfirmIndex: [], // 上一次确认选择后的各个滚动列表所选择值的索引
        pickerValues: [], // 当前各个滚动列表所选择的内容，包含了诸多信息
        pickerText: [] // 当前各个滚动列表所选择的内容，仅包含了文本信息
      };
    },
    props: {
      title: { // 下拉框标题
        type: String,
        default: ''
      },
      visibleItemCount: { // 规定每个列表最大可视选项的个数，该值必须是一个奇数
        type: Number,
        default: 5
      },
      itemHeight: { // 设置每一选项的样式高度，单位px
        type: Number,
        default: 36
      },
      value: { // 用来开启或关闭下拉选择框的开关，可以是任意自定义的变量名。在调用组件时用v-model进行绑定
        type: Boolean,
        default: false
      },
      closeOnClickModal: { // 是否可以通过点击遮罩层关闭下拉列表框
        type: Boolean,
        default: true
      },
      rememberPosition: { // 是否设置每次打开picker时自动初始化到之前一次所确认选择值的位置
        type: Boolean,
        default: false
      },
      isOnScrollChange: { // 是否设置当滚动一个列表时，禁止其他列表滚动并清除数据
        type: Boolean,
        default: false
      },
      slots: { // 各个列表的数据
        type: Array
      }
    },
    computed: {
      // 计算每个列表的高度
      contentHeight() {
        return this.itemHeight * this.visibleItemCount;
      },
      // 计算非divider列表的padding-top值
      contentPaddingTop() {
        return this.itemHeight * parseInt(this.visibleItemCount / 2);
      }
    },
    watch: {
      value(val) {
        this.isShow = val;
      },
      // 监听picker的开启与关闭，每次开启都会创建或重置wheels，每次关闭都会停止所有列表的滚动
      isShow(val) {
        this.$emit('input', val);
        if (val) {
          this._initCheckWheels();
        } else {
          for (var i = 0; i < this.wheels.length; i++) {
            if (this.wheels[i]) {
              this.wheels[i].stop();
            }
          }
        }
      },
      // pickerValues变化的同时pickerText也随之变化
      pickerValues(val) {
        this.setEmitPickerText();
      },
      // 迷之代码，作者也不记得当初为什么写这段
      pickerSelectedIndex(val) {
        for (var i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            if (this.slots[i].values.length <= val[i]) {
              this.scrollTo(i, this.slots[i].values.length - 1);
            }
          }
        }
      }
    },
    created() {
      this._initData();
    },
    methods: {
      // 初始化pickerSelectedIndex数组，并根据有无设置defaultIndex来初始化默认选择位置
      _initData() {
        for (var i = 0; i < this.slots.length; i++) {
          if (!this.slots[i].divider) {
            if (this.slots[i].defaultIndex) {
              this.pickerSelectedIndex[i] = this.slots[i].defaultIndex;
            } else {
              this.pickerSelectedIndex[i] = 0;
            }
          }
        }
      },
      // 初始化滚动列表
      _initCheckWheels() {
        this.$nextTick(() => {
          for (var i = 0; i < this.slots.length; i++) {
            if (!this.slots[i].divider) {
              let wheelWrapper = this.$refs['wheelWrapper' + i][0];
              this._createWheel(wheelWrapper, i);
            }
          }
          this.setEmitValues(0, this.wheels[0].getSelectedIndex()); // 默认派发第一个滚动列表中当前所选值
        });
      },
      /*
       * 初始化或重置better-scroll实例，并绑定相关事件
       * params:
         * wheelWrapper: 实例化需要的dom挂载点
         * i: wheels数组下标
       */
      _createWheel(wheelWrapper, i) {
        if (!this.wheels[i]) {
          this.wheels[i] = new BScroll(wheelWrapper, { // better-scroll实例化
            wheel: {
              selectedIndex: this.pickerSelectedIndex[i],
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item',
              rotate: 0
            },
            bounce: false,
            probeType: 2
          });
          this.wheels[i].on('scroll', () => {
            this.onlyScrollOne(i);
          });
          this.wheels[i].on('scrollEnd', () => {
            this.change(i, this.wheels[i].getSelectedIndex());
          });
        } else {
          this.wheels[i].refresh(); // better-scroll重置
          if (this.rememberPosition) {
            this.scrollTo(i, this.pickerSelectedConfirmIndex[i]); // 自动滚动到上一次确认选择的位置
          } else {
            this._initData();
            this.scrollTo(i, this.pickerSelectedIndex[i]); // 自动滚动到初始化默认位置
          }
        }
      },
      /*
       * 重新对滚动列表进行实例化，以确保数据内容变化后当前滚动列表各项参数与数据重置与同步
       * params:
         * index: wheels数组下标
         * dist: 具体位置的数组下标
       */
      reSetWheel(index, dist) {
        if (this.wheels[index]) {
          this.wheels[index].refresh();
          this.wheels[index].destroy(); // better-scroll实例销毁
          this.wheels[index] = ''; // 清空实例变量
          if (dist >= 0) {
            this.pickerSelectedIndex[index] = dist;
          } else {
            if (this.slots[index].defaultIndex >= 0) {
              this.pickerSelectedIndex[index] = this.slots[index].defaultIndex;
            } else {
              this.pickerSelectedIndex[index] = 0;
            }
          }
          let wheelWrapper = this.$refs['wheelWrapper' + index][0];
          this.$nextTick(() => {
            this._createWheel(wheelWrapper, index); // 重新实例化better-scroll
            this.setEmitPickerText();
          });
        }
      },
      // 重制所有数据与参数
      reSetAll() {
        for (var i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            this.wheels[i].destroy();
            this.wheels[i] = '';
          }
        }
        this.pickerSelectedConfirmIndex = [];
        this._initData();
      },
      /*
       * 滚动列表后，更新pickerSelectedIndex数组
       * params:
        * index: pickerSelectedIndex数组下标
        * dist: 具体位置的数组下标
       */
      setSelectedIndex(index, dist) {
        this.$set(this.pickerSelectedIndex, index, dist); // 用vue的set方法可以确保让vue能监听到pickerSelectedIndex数组的变化
      },
      /*
       * 滚动到指定位置
       * params:
         * index: wheels数组下标
         * dist: 具体位置的数组下标
       */
      scrollTo(index, dist) {
        if (dist >= 0) {
          this.wheels[index].wheelTo(dist);
          this.change(index, dist);
        }
      },
      /*
       * 滚动后当前位置被改变，相关数据也随之发生变化
       * params:
         * index: wheels数组下标
         * dist: 具体位置的数组下标
       */
      change(index, dist) {
        this.setSelectedIndex(index, this.wheels[index].getSelectedIndex());
        this.setEmitValues(index, dist);
      },
      /*
       * 根据当前各个滚动列表所在位置，整理生成数据包放进pickerValues数组，派发给调用者
       * params:
         * index: slots数组下标
         * dist: 当前位置的数组下标
       */
      setEmitValues(index, dist) {
        this.pickerValues = [];
        for (var i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            this.pickerValues[i] = [];
            if (i === index) {
              let value = this.slots[index].values[dist];
              this.$set(this.pickerValues, index, { index: dist, value: value, wheel: index }); // 生成数据包，内容包含index：当前所选位置下标；value：当前所选文本内容；wheel：当前滚动列表wheels下标
            }
          }
        }
        let pickerValue = [];
        let count = 0;
        for (var j = 0; j < this.pickerValues.length; j++) { // 对pickerValues数组整理，下标从0开始，删除无效的数据项
          if (this.pickerValues[j]) {
            pickerValue[count] = [];
            pickerValue[count] = this.pickerValues[j];
            count++;
          }
        }
        this.$emit('change', this, pickerValue); // 将结果派发给调用者
      },
      /*
       * 更改变化slots数据内容，将变化后的内容重新渲染到滚动列表中
       * params:
         * index: slots数组下标
         * values: 新数据
         * defaultDist: 当前slots的默认初始化位置，默认为-1表示不设置
       */
      setSlotValues(index, values, defaultDist = -1) {
        this.$set(this.slots[index], 'values', values);
        this.reSetWheel(index, defaultDist);
      },
      /*
       * 当某一滚动列表在滚动时，禁止其他滚动列表的使用
       * params:
        * index: wheels数组下标
       */
      onlyScrollOne(index) {
        if (this.isOnScrollChange === false) {
          return false;
        }
        let i, j;
        for (i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            if (index === i) {
              for (j = i + 1; j < this.wheels.length; j++) {
                if (this.wheels[j]) {
                  this.slots[j].values = []; // 清空数据
                  this.wheels[j].disable(); // 禁用滚动
                  this.wheels[j].stop(); // 停止滚动
                }
              }
            }
          }
        }
      },
      // 根据当前各个滚动列表所选文本内容，生成数据包，派发给调用者
      setEmitPickerText() {
        let count = 0;
        this.pickerText = [];
        for (var i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            if (this.slots[i].values && this.slots[i].values[this.pickerSelectedIndex[i]]) {
              this.$set(this.pickerText, count, this.slots[i].values[this.pickerSelectedIndex[i]]);
            }
            count++;
          }
        }
        this.$emit('pickerText', this.pickerText, this.pickerSelectedIndex);
      },
      // 关闭picker
      toHide() {
        if (this.closeOnClickModal) {
          this.isShow = false;
          this.$emit('pickerHide');
        }
      },
      // “取消”按钮，关闭picker
      cancel() {
        this.isShow = false;
        this.$emit('pickerCancel');
      },
      // “确认”按钮，记住当前所选项，并关闭picker
      confirm() {
        for (var i = 0; i < this.wheels.length; i++) {
          if (this.wheels[i]) {
            this.pickerSelectedConfirmIndex[i] = this.wheels[i].getSelectedIndex();
          }
        }
        this.isShow = false;
        this.$emit('pickerConfirm', this.pickerText, this.pickerSelectedConfirmIndex);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "Picker.sass";
</style>
