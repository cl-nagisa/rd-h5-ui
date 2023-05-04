<!-- by fl -->
<template>
  <div class="page">

    <div class="demo">
      <label >单行间隔3秒滚动</label>
      <info-scroll-bar ref="infoScrollBar1" class="wrapper one-line" :height="oneLineHeight">
        <div>
          <ul>
            <li v-for="(item, index) in data" ref="oneLineItem" :class="'li' + index">{{ item }}</li>
          </ul>
          <ul>
            <li v-for="(item, index) in data" ref="oneLineItem" :class="'li' + index">{{ item }}</li>
          </ul>
        </div>
      </info-scroll-bar>
    </div>

    <div class="demo">
      <label>单行实时滚动</label>
      <info-scroll-bar ref="infoScrollBar2" class="wrapper one-line" :height="31" :delay="0">
        <div>
          <ul>
            <li v-for="(item, index) in data">{{ item }}</li>
          </ul>
          <ul>
            <li v-for="(item, index) in data">{{ item }}</li>
          </ul>
        </div>
      </info-scroll-bar>
    </div>

    <div class="demo">
      <label>多行间隔1秒滚动，带点击效果</label>
      <info-scroll-bar ref="infoScrollBar3" class="wrapper more-line" :height="31" :delay="1000">
        <div>
          <ul>
            <li v-for="(item, index) in data" @click="clickEvent(item, index)">{{ item }}</li>
          </ul>
          <ul>
            <li v-for="(item, index) in data" @click="clickEvent(item, index)">{{ item }}</li>
          </ul>
        </div>
      </info-scroll-bar>
    </div>

    <div class="demo">
      <label>多行实时滚动——带开始暂停按钮</label>
      <info-scroll-bar ref="infoScrollBar4" class="wrapper article-line" :height="articleLineHeight" :speed="60" :delay="0">
        <div class="article-wrapper" ref="articleLineWrapper">
          <p class="article-header">《CLANNAD》是日本游戏品牌Key继《Kanon》、《AIR》后发行的第三款恋爱冒险游戏，游戏于2004年4月28日发行PC初回限定版，并依此为原作改编或扩充跨媒体制作的作品。游戏PC版在最初公开时的预定发售日期是2002年，后来预定发售日被延期至2003年，之后再一次被延期至2004年4月28日，相比最初的预定延期了2年。在剧情设计上，延续了Key社出品的前两部作品的特点。但与前两部有所不同的是，本作在发布伊始即确定为全年龄对象。因其剧情大部分发生于春季，亦被视为Key社游戏“季节组曲”中的“春”。</p>
          <img src="../../../assets/images/gallery/1.jpg">
          <p>在某个小镇，主角冈崎朋也因为家庭的因素成为不良少年，一直与春原阳平为伍，在光坂高校过着潦倒的生活，但冀望终有一天能够离开所在的小镇。某年4月14日，他在学校坡道前发现了一个止步不前的女孩，在朋也认识了这个名为“古河渚”的女孩后，他的生活开始有了重大的变化。学园篇为主角和女主角们之间所发生的事件，After story为主角在学校毕业之后，以及家庭生活，其中还关联著“幻想世界”，CLANNAD就是由这三个要素所组成的故事。</p>

          <p class="article-header">《CLANNAD》是日本游戏品牌Key继《Kanon》、《AIR》后发行的第三款恋爱冒险游戏，游戏于2004年4月28日发行PC初回限定版，并依此为原作改编或扩充跨媒体制作的作品。游戏PC版在最初公开时的预定发售日期是2002年，后来预定发售日被延期至2003年，之后再一次被延期至2004年4月28日，相比最初的预定延期了2年。在剧情设计上，延续了Key社出品的前两部作品的特点。但与前两部有所不同的是，本作在发布伊始即确定为全年龄对象。因其剧情大部分发生于春季，亦被视为Key社游戏“季节组曲”中的“春”。</p>
          <img src="../../../assets/images/gallery/1.jpg">
          <p>在某个小镇，主角冈崎朋也因为家庭的因素成为不良少年，一直与春原阳平为伍，在光坂高校过着潦倒的生活，但冀望终有一天能够离开所在的小镇。某年4月14日，他在学校坡道前发现了一个止步不前的女孩，在朋也认识了这个名为“古河渚”的女孩后，他的生活开始有了重大的变化。学园篇为主角和女主角们之间所发生的事件，After story为主角在学校毕业之后，以及家庭生活，其中还关联著“幻想世界”，CLANNAD就是由这三个要素所组成的故事。</p>
        </div>
      </info-scroll-bar>
      <div class="button">
        <span @click="stop">暂停</span>
        <span @click="strat">开始</span>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import InfoScrollBar from '../../../components/InfoScrollBar/InfoScrollBar.vue'; // 信息轮播条组件

  export default {
    data() {
      return {
        data: '', // 轮播数据源
        oneLineHeight: 0, // 单行间隔3秒滚动的滚动区域高度
        articleLineHeight: 0 // 多行实时滚动的滚动区域高度
      };
    },
    components: { InfoScrollBar },
    created() {
      this._initData();
    },
    methods: {
      // 点击测试
      clickEvent(item, index) {
        window.alert('当前点击的是第' + (index + 1) + '位"' + item + '"');
      },
      // 初始化数据与某些计算
      _initData() {
        this.$http.get('/api/dataJson').then((res) => {
          this.data = res.data.data.byName;
          this._calculateHeight();
          this._initScroll();
        });
      },
      // 开启各demo的滚动效果
      _initScroll() {
        this.$refs.infoScrollBar2.run();
        this.$refs.infoScrollBar3.run();
      },
      // 异步计算滚动区域高度
      _calculateHeight() {
        this.$nextTick(() => {
          this.oneLineHeight = this.$refs.oneLineItem[0].clientHeight;
          this.articleLineHeight = this.$refs.articleLineWrapper.clientHeight;
        });
      },
      // 开启滚动效果
      strat() {
        this.$refs.infoScrollBar4.start();
      },
      // 暂停滚动效果
      stop() {
        this.$refs.infoScrollBar4.stop();
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
