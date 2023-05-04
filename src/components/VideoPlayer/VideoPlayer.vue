<!-- by fl -->
<template>
  <div class="fl-videoPlayer-wrapper"
       ref="videoPlayer"
       :style="{
       'width': width >= 0 ? width + 'px' : '100%',
       'height': height >= 0 ? height + 'px' : '100%',
       }">
    <div class="screen-wrapper" :class="{ 'full-screen': isFullScreen }">
      <div class="poster-wrapper" v-show="posterWrpShow" :style="{ 'background-image': 'url(' + poster + ')' }" @click="play">
        <label class="duration" v-show="duration > 0">{{ secondToDate(duration) }}</label>
        <img class="icon" src="./images/play.png">
      </div>
      <div class="controls-wrapper" v-show="controlsWrpShow" @click.self="controlsWrpShow = false">
        <img class="icon" v-show="isPlaying" src="./images/pause.png" @click.stop="pause">
        <img class="icon" v-show="!isPlaying" src="./images/play.png" @click.stop="play">
        <div class="controls">
          <div class="time">{{ secondToTime(currentTime) }}/{{ secondToTime(duration) }}</div>
          <div class="time-axis" @click="axisClick">
            <div class="line"><i :style="{ 'width': playProgress + '%' }"></i></div>
          </div>
          <div class="screen" @click.stop="isFullScreen = !isFullScreen"><img src="./images/fullscreen.png"></div>
        </div>
      </div>
      <video class="video-wrapper"
             ref="video"
             :src="src"
             preload="auto"
             playsinline="true"
             webkit-playsinline="true"
             @click="controlsWrpShow = true"
             @canplay="canplay"
             @ended="ended"
             @timeupdate="timeupdate"></video>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        video: '', // video实例
        timer: '', // 定时器
        currentTime: 0, // 当前播放位置，单位秒
        duration: 0, // 视频时长，单位秒
        posterWrpShow: true, // 封面层
        controlsWrpShow: false, // 控制栏层
        isPlaying: false, // 是否播放中，true 播放中
        isFullScreen: false, // 是否全屏播放中，true 全屏
        isEnded: false // 是否播放完毕，true 播放完毕
      };
    },
    props: {
      src: { // 视频地址，仅支持服务器地址形式
        type: String,
        default: ''
      },
      poster: { // 封面图片地址，仅支持服务器地址形式
        type: String,
        default: ''
      },
      width: { // 播放器宽度，单位px，默认100%
        type: Number,
        default: -1
      },
      height: { // 播放器高度，单位px，默认100%
        type: Number,
        default: -1
      }
    },
    watch: {
      // 监听控制层，开启后5秒内无操作后自动关闭
      controlsWrpShow(val) {
        if (val) {
          this.timerStar();
        } else {
          clearTimeout(this.timer);
        }
      },
      // 监听全屏开启与关闭
      isFullScreen() {
        this.timerRest();
      }
    },
    computed: {
      // 播放进度
      playProgress() {
        return Number((this.currentTime / this.duration * 100).toFixed(2));
      }
    },
    created() {
      this.$nextTick(() => {
        this.video = this.$refs.video;
      });
    },
    methods: {
      // 开始播放
      play() {
        this.isEnded === true ? this.video.currentTime = 0 : '';
        this.posterWrpShow = false;
        this.isPlaying = true;
        this.isEnded = false;
        this.video.play();
        this.timerRest();
      },
      // 暂停播放
      pause() {
        this.isPlaying = false;
        this.video.pause();
        this.timerRest();
      },
      // 当浏览器可以播放视频时
      canplay() {
        this.duration = Number(this.video.duration.toFixed(2));
      },
      // 当视频播放完毕时
      ended() {
        this.isPlaying = false;
        this.isEnded = true;
      },
      // 当前的播放位置已更改时
      timeupdate() {
        this.currentTime = Number(this.video.currentTime.toFixed(2));
      },
      // 单击时间轴
      axisClick(e) {
        this.timerRest();
        let clientWidth = this.$el.querySelector('.time-axis').clientWidth;
        let offsetX = e.offsetX;
        this.video.currentTime = Number((offsetX / clientWidth * this.duration).toFixed(2));
        if (this.isEnded) {
          this.video.play();
        }
      },
      // 秒数转为时分秒
      secondToDate(val) {
        if (isNaN(val)) {
          val = 0;
        }
        val = val.toFixed(0);
        let h = Math.floor(val / 3600) < 10 ? '0' + Math.floor(val / 3600) : Math.floor(val / 3600);
        let m = Math.floor((val / 60 % 60)) < 10 ? '0' + Math.floor((val / 60 % 60)) : Math.floor((val / 60 % 60));
        let s = Math.floor((val % 60)) < 10 ? '0' + Math.floor((val % 60)) : Math.floor((val % 60));
        return h + ':' + m + ':' + s;
      },
      // 秒数转为分秒
      secondToTime(val) {
        if (isNaN(val)) {
          val = 0;
        }
        val = val.toFixed(0);
        let m = Math.floor(val / 60) < 10 ? '0' + Math.floor(val / 60) : Math.floor(val / 60);
        let s = Math.floor((val % 60)) < 10 ? '0' + Math.floor((val % 60)) : Math.floor((val % 60));
        return m + ':' + s;
      },
      // 定时器开启，控制层开启后5秒内无操作后自动关闭
      timerStar() {
        this.timer = setTimeout(() => {
          this.controlsWrpShow = false;
        }, 5000);
      },
      // 定时器重置，如控制层有操作时调用此方法
      timerRest() {
        if (this.controlsWrpShow) {
          clearTimeout(this.timer);
          this.timerStar();
        }
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "VideoPlayer.sass";
</style>
