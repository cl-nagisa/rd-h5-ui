<!-- by fl -->
<template>
  <div class="page">
    <video-player :src="videoSrc" :poster="poster" :height="height"></video-player>
  </div>
</template>

<script type="text/ecmascript-6">
  import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer.vue';

  export default {
    data() {
      return {
        videoSrc: 'https://apih5test.xhzhangdaibao.com/miku.mp4',
        poster: 'http://zhangdaibao.oss-cn-hangzhou.aliyuncs.com/201/l8664811198490194889.jpg',
        height: 200
      };
    },
    components: { VideoPlayer },
    created() {
    },
    methods: {
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
