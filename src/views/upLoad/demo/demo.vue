<!-- by fl -->
<template>
  <div class="page">
    <div class="demo">
      <label>点击图片可以查看大图</label>
      <label>已成功上传<i>{{ imgData.length }}</i>张，还可以上传<i>{{ length - imgData.length }}</i>张</label>
      <up-load v-model="imgData" :length="length" :picList="picList" @error="error" @upLoad="upLoad" @toLook="toLook"></up-load>
    </div>

    <photo-swipe ref="photoSwipe" :items="picList"></photo-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import UpLoad from '../../../components/UpLoad/UpLoad.vue';
  import PhotoSwipe from '../../../components/PhotoSwipe/PhotoSwipe.vue';

  export default {
    data() {
      return {
        length: 5,
        imgData: [],
        picList: [] // 图片预览列表
      };
    },
    components: { UpLoad, PhotoSwipe },
    methods: {
      // 上传图片大小溢出提示
      error() {
        window.alert('图片大小不能超过5M');
      },
      // 图片上传
      upLoad(that, files) {
        // 调用接口上传图片，此处略
        // 模拟调用接口上传图片过程2s
        setTimeout(() => {
          let max = 3;
          let min = 0;
          let res = Math.floor(Math.random() * (max - min + 1) + min);
          if (res > 0) {
            that.upLoadSucc();
          } else {
            window.alert('图片上传失败，请重试');
            that.upLoadFail();
          }
        }, 2000);
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
  @import "demo.sass";
</style>
