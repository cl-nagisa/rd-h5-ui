<!-- by fl -->
<template>
  <div class="page">
    <div class="gallery">
      <ul ref="gallery">
        <li><img src="../../../../assets/images/gallery/1.jpg" title="伊吹风子&古河渚"></li>
        <li><img src="../../../../assets/images/gallery/2.jpg" title="古河渚"></li>
        <li><img src="../../../../assets/images/gallery/3.jpg" title="藤林杏"></li>
        <li><img src="../../../../assets/images/gallery/4.jpg" title="全家福"></li>
        <li><img src="../../../../assets/images/gallery/5.jpg" title="樱花下的坡道"></li>
        <li><img src="../../../../assets/images/gallery/6.jpg" title="校园"></li>
        <li><img src="../../../../assets/images/gallery/7.jpg" title="板上智代"></li>
        <li><img src="../../../../assets/images/gallery/8.jpg" title="古河渚"></li>
        <li><img src="../../../../assets/images/gallery/9.jpg" title="字典帝&武帝"></li>
        <li><img src="../../../../assets/images/gallery/10.jpg" title="演剧部"></li>
        <li><img src="../../../../assets/images/gallery/11.jpg" title="春原芽衣"></li>
        <li><img src="../../../../assets/images/gallery/12.jpg" title="古河渚"></li>
        <li><img src="../../../../assets/images/gallery/13.jpg" title="一之濑琴美"></li>
        <li><img src="../../../../assets/images/gallery/14.jpg" title="古河渚&藤林杏"></li>
        <li><img src="../../../../assets/images/gallery/15.jpg" title="一之濑琴美"></li>
        <li><img src="../../../../assets/images/gallery/16.jpg" title="clannad"></li>
      </ul>
    </div>
    <photo-swipe ref="photoSwipe" :items="picList"></photo-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import PhotoSwipe from '../../../../components/PhotoSwipe/PhotoSwipe.vue'; // 引入PhotoSwipe组件

  export default {
    data() {
      return {
        picList: [] // 图片数据
      };
    },
    components: { PhotoSwipe },
    created() {
      this.$nextTick(() => {
        this._initData();
      });
    },
    methods: {
      // 初始化相册中的图片数据
      _initData() {
        let gallery = this.$refs.gallery.children;
        for (let i = 0; i < gallery.length; i++) {
          let imgDom = gallery[i].children[0];
          let img = new window.Image(); // 获取原始图片的实例对象，以便获取原始图片的高宽
          img.src = imgDom.attributes.src.value;
          this.picList[i] = {};
          img.onload = () => {
            this.picList[i] = {
              src: img.src,
              w: img.width,
              h: img.height,
              title: imgDom.attributes.title ? imgDom.attributes.title.value : ''
            };
            this.bindClick(i);
          };
        }
      },
      // 为每一个li标签绑定单击事件
      bindClick(index) {
        let liDom = this.$refs.gallery.children[index];
        liDom.onclick = () => {
          this.toLook(index);
        };
      },
      // 在相册中显示对应图片
      toLook(index) {
        this.$refs.photoSwipe.init();
        this.$refs.photoSwipe.gallery.options.index = index;
        this.$refs.photoSwipe.open();
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "gallery.sass";
</style>
