<!-- by fl -->
<template>
  <div class="fl-upLoad-wrapper">
    <ul>
      <li v-for="(item, index) in imgList">
        <img class="icon-close" src="./assets/images/close.png" @click="doDelete(index)">
        <img class="files-img" :src="item.src" @click="toLook(index)">
      </li>
      <li class="add-img" v-if="!isMax">
        <template v-if="!loading">
          <div class="content">
            <img src="./assets/images/addImg.png">
            <label>上传</label>
          </div>
          <input class="photo-upload" type="file" @change="upload" accept="image/*">
        </template>
        <template v-if="loading">
          <div class="loading">
            <div class="k-line k-line11-1"></div>
            <div class="k-line k-line11-2"></div>
            <div class="k-line k-line11-2"></div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        fliles: '', // 当前上传文件
        loading: false, // 上传中loading动画显示
        filesList: [], // 已上传图片file对象列表
        imgList: [] // 已上传图片列表
      };
    },
    props: {
      length: { // 最大上传图片张数，默认1张
        type: Number,
        default: 1
      },
      size: { // 最大上传大小，默认5M
        type: Number,
        default: 5
      },
      value: { // 已上传图片列表。在调用组件时用v-model进行绑定
        type: Array
      },
      picList: { // 图片预览列表
        type: Array
      }
    },
    computed: {
      // 是否到达最大上传图片张数限制
      isMax() {
        if (this.imgList.length >= this.length) {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      value(val) {
        this.filesList = val;
      },
      filesList(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      // 本地图片获取
      upload() {
        let input = this.$el.querySelector('.photo-upload');
        let fliles = input.files[0];
        if (fliles) {
          if (fliles.size > (1024 * 1024 * this.size)) {
            this.$emit('error', 'size');
            input.value = '';
          } else {
            this.fliles = fliles;
            this.loading = true;
            this.$emit('upLoad', this, fliles);
          }
        }
      },
      // 上传成功
      upLoadSucc() {
        this.loading = false;
        let name = this.fliles.name;
        let pos = '.' + name.replace(/.+\./, '');
        name = name.replace(pos, '');
        this.imgList.push({
          src: window.URL.createObjectURL(this.fliles),
          name: name
        });
        this.filesList.push(this.fliles);
        let img = new window.Image(); // 获取原始图片的实例对象，以便获取原始图片的高宽
        img.src = window.URL.createObjectURL(this.fliles);
        img.onload = () => {
          this.picList.push({
              src: window.URL.createObjectURL(this.fliles),
              w: img.width,
              h: img.height,
              title: name
            }
          );
        };
      },
      // 上传失败
      upLoadFail() {
        this.loading = false;
      },
      // 删除图片
      doDelete(index) {
        this.imgList.splice(index, 1);
        this.filesList.splice(index, 1);
        this.picList.splice(index, 1);
        this.$emit('delete', index);
      },
      // 在相册中显示对应图片
      toLook(index) {
        this.$emit('toLook', index);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "UpLoad.sass";
</style>
