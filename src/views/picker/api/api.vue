<!-- by fl -->
<template>
  <div class="page">
    <div class="menu-button" :class="{ 'open': isMenuShow }" @click="toShowMenu">></div>
    <div class="menu-list" :class="{ 'open': isMenuShow }" ref="menuList">
       <ul>
         <h5>属性</h5>
         <li @click="toPosition('closeOnClickModal')">closeOnClickModal</li>
         <li @click="toPosition('itemHeight')">itemHeight</li>
         <li @click="toPosition('isOnScrollChange')">isOnScrollChange</li>
         <li @click="toPosition('rememberPosition')">rememberPosition</li>
         <li @click="toPosition('slots')">slots</li>
         <li @click="toPosition('slots-content')">slots.content</li>
         <li @click="toPosition('slots-defaultIndex')">slots.defaultIndex</li>
         <li @click="toPosition('slots-divider')">slots.divider</li>
         <li @click="toPosition('slots-flex')">slots.flex</li>
         <li @click="toPosition('slots-textAlign')">slots.textAlign</li>
         <li @click="toPosition('slots-values')">slots.values</li>
         <li @click="toPosition('slots-width')">slots.width</li>
         <li @click="toPosition('title')">title</li>
         <li @click="toPosition('value')">value</li>
         <li @click="toPosition('visibleItemCount')">visibleItemCount</li>
         <h5>事件</h5>
         <li @click="toPosition('change')">closeOnClickModal</li>
         <li @click="toPosition('pickerCancel')">pickerCancel</li>
         <li @click="toPosition('pickerConfirm')">pickerConfirm</li>
         <li @click="toPosition('pickerHide')">pickerHide</li>
         <li @click="toPosition('pickerText')">pickerText</li>
         <h5>方法</h5>
         <li @click="toPosition('setSlotValues')">setSlotValues</li>
         <li @click="toPosition('reSetAll')">reSetAll</li>
       </ul>
    </div>
    <div class="api-list" ref="apiList" @click="isMenuShow = false">
      <ul>
        <h4>属性</h4>
        <li class="closeOnClickModal">
          <h5>closeOnClickModal</h5>
          <label>类型：Boolean</label>
          <span>默认值：true</span>
          <p>作用：是否可以通过单击遮罩层来关闭此组件。</p>
        </li>
        <li class="itemHeight">
          <h5>itemHeight</h5>
          <label>类型：Number</label>
          <span>默认值：36</span>
          <p>作用：设置每一选项的样式高度，单位px。</p>
        </li>
        <li class="isOnScrollChange">
          <h5>isOnScrollChange</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：该属性只会在有两个及以上滚动列表（即slots数组大于等于2）时有效。该值设为true时，当某一列表在滚动时，它的下级列表们会被强制禁用并清空数据，直到该列表滚动结束后，它的下级列表才会被重新创建并根据需要显示指定数据。该属性主要用在列表数据庞大时且希望用户在滚动某一列表时不能对其它数据同时滚动选择的时候。详情可参见demo中的<u @click="toPage">“城市选择器”</u>。</p>
        </li>
        <li class="rememberPosition">
          <h5>rememberPosition</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：当设为true时，会在每次开启下拉选择框时自动初始化到之前用户<b>确认</b>所选值的位置。在默认false情况下，用户在某次选择完后关闭再开启下拉选择框时，列表数据会初始化成页面首次加载进来时的默认选择位置。实际实现效果可参见demo中各个列子。</p>
        </li>
        <li class="slots">
          <h5>slots</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：下拉选择框所展示的可选列表内容。详细子属性请往下看。</p>
        </li>
        <li class="slots-content">
          <h5>slots.content</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：仅当slots.divider设为true时才生效。列表之前的分隔符文案。</p>
        </li>
        <li class="slots-defaultIndex">
          <h5>slots.defaultIndex</h5>
          <label>类型：Number</label>
          <span>默认值：0</span>
          <p>作用：当slots.divider设为true时不生效。当前列表初始化时默认选中的值，该值为slots.values数组中的数组下标。</p>
        </li>
        <li class="slots-divider">
          <h5>slots.divider</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：判断当前列表是否是分隔符。</p>
        </li>
        <li class="slots-flex">
          <h5>slots.flex</h5>
          <label>类型：String</label>
          <span>默认值：1 1 auto</span>
          <p>作用：设置当前列表或分隔符所在dom的flex样式属性。<b>当slots.divider设为false时，默认值为1 1 auto，当slots.divider设为true时，默认值为0 auto。</b></p>
        </li>
        <li class="slots-textAlign">
          <h5>slots.textAlign</h5>
          <label>类型：String</label>
          <span>默认值：center</span>
          <p>作用：设置当前列表或分隔符所在dom的text-align样式属性。</p>
        </li>
        <li class="slots-values">
          <h5>slots.values</h5>
          <label>类型：Array</label>
          <span>默认值：空</span>
          <p>作用：当slots.divider设为true时不生效。当前列表数据内容。</p>
        </li>
        <li class="slots-width">
          <h5>slots.width</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：设置当前列表或分隔符所在dom的width样式属性。单位自定义，可以是%，也可以是px。</p>
        </li>
        <li class="title">
          <h5>title</h5>
          <label>类型：String</label>
          <span>默认值：空</span>
          <p>作用：显示下拉框顶部标题文字。</p>
        </li>
        <li class="value">
          <h5>value</h5>
          <label>类型：Boolean</label>
          <span>默认值：false</span>
          <p>作用：用来开启或关闭下拉选择框的开关。可以是任意自定义的变量名。在调用组件时用v-model进行绑定。</p>
        </li>
        <li class="visibleItemCount">
          <h5>visibleItemCount</h5>
          <label>类型：Number</label>
          <span>默认值：5</span>
          <p>作用：规定每个列表最大可视选项的个数。该值必须是一个奇数。</p>
        </li>
        <h4>事件</h4>
        <li class="change">
          <h5>change</h5>
          <label>参数：this，pickerValue</label>
          <span>触发时机：下拉列表框每次开启时和某一列表滚动效果结束后（即scroll-better自带的scrollEnd事件）触发。</span>
          <p>作用：当滚动结束后，会派发两个参数。参数this指picker组件本身，相当于this.$refs.picker。参数pickerValue是个数组，用来传回当前滚动列表结束后停留的位置及相关信息，信息如下：数组下标-表示哪个列表，index-停留位置，value-停留位置的内容文案，wheel-相对于picker组件来讲当前是哪个列表在滚动。详情用法可参考demo中的<u @click="toPage">“城市选择器”</u>。</p>
        </li>
        <li class="pickerCancel">
          <h5>pickerCancel</h5>
          <label>参数：无</label>
          <span>触发时机：用户单击“取消”按钮后关闭下拉列表框时触发。</span>
          <p>作用：仅仅是关闭下拉列表框。</p>
        </li>
        <li class="pickerConfirm">
          <h5>pickerConfirm</h5>
          <label>参数：pickerText, pickerSelectedConfirmIndex</label>
          <span>触发时机：用户单击“确认”按钮后关闭下拉列表框时触发。</span>
          <p>作用：关闭下拉列表框，同时记住当前下拉列表框所滚动到的位置及内容。参数pickerText是个数组，仅仅用来存放当前下拉列表框每个列表所选的内容文案。参数pickerSelectedConfirmIndex是个数组，仅仅用来存放当前下拉列表框每个列表所选内容对应slot中的数组下标。</p>
        </li>
        <li class="pickerHide">
          <h5>pickerHide</h5>
          <label>参数：无</label>
          <span>触发时机：用户单击遮罩层后关闭下拉列表框时触发。</span>
          <p>作用：当closeOnClickModal属性设为true是才生效。仅仅是关闭下拉列表框。</p>
        </li>
        <li class="pickerText">
          <h5>pickerText</h5>
          <label>参数：pickerText, pickerSelectedIndex</label>
          <span>触发时机：与change事件一样。</span>
          <p>作用：方便开发人员直接获取到当前整个下拉列表框所选择的值。参数pickerText是个数组，仅仅用来存放当前下拉列表框每个列表所选的内容文案。参数pickerSelectedIndex是个数组，仅仅用来存放当前下拉列表框每个列表所选内容对应slot中的数组下标。</p>
        </li>
        <h4>方法</h4>
        <li class="setSlotValues">
          <h5>setSlotValues</h5>
          <label>参数：index，values，defaultDist</label>
          <span>返回值：无</span>
          <p>作用：仅在change事件中搭配使用，用在用户选择完某一列表选项后，后续列表需要根据当前所选址改变其数据时使用。参数index表示需要更改哪个列表的数据；参数values表示需要更换成的数据；参数defaultDist表示更新新数据后初始化默认选中第几个选项，默认值为-1，大于等于0时才生效，-1表示不使用此参数配置，默认用slots.defaultIndex作为默认值。详情用法可参考demo中的<u @click="toPage">“城市选择器”</u>。</p>
        </li>
        <li class="reSetAll">
          <h5>reSetAll</h5>
          <label>参数：无</label>
          <span>返回值：无</span>
          <p>作用：重新初始化下拉列表所有内容。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        isMenuShow: false
      };
    },
    created() {
      this.$nextTick(() => {
        this._initWheel('menuList', this.$refs.menuList);
        this._initWheel('apiList', this.$refs.apiList);
      });
    },
    methods: {
      _initWheel(name, dom) {
        this[name] = new BScroll(dom, {
          bounce: false,
          click: true,
          probeType: 2
        });
        if (name === 'apiList') {
          this[name].on('scroll', () => {
            this.isMenuShow = false;
          });
        }
      },
      toShowMenu() {
        this.isMenuShow = !this.isMenuShow;
      },
      toPage() {
        this.$router.push({ name: 'demo' });
      },
      toPosition(dom) {
        let position = this.$el.querySelector('.' + dom);
        this.apiList.scrollToElement(position, 300);
        this.isMenuShow = false;
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "api.sass";
</style>
