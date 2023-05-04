<!-- by fl -->
<template>
  <div class="page">
    <div ref="article" class="article">
      <h3>Clannad</h3>
      <p>由游戏改编而成的动漫，key社催泪三弹之一，影响深远的悲剧神作。</p>
      <p>“催泪三弹”——春之《clannad》，夏之《air》，冬之《kanon》都是key社赖以成名的佳作，也都是动漫史上十分经典的作品。公认的，影响力最大的是clannad。以其大胆的艺术剧情设置和残酷真实的对生活的描述而被授予崇高的称赞：这就是生活。</p>
      <img src="../../../../assets/images/gallery/a.jpg" title="团子大家族">
      <p>这部动漫从男主人公冈崎朋也的高二生活，一直记叙到结婚生子，再到家破人亡，最后峰回路转的曲折故事（够曲折……），其中尤其以第二季后半期，朋也从浑浑噩噩的生活中醒悟过来，突如其来的灾难迫使他毫无准备的踏入残酷的社会，面对社会的压力，内心不断蜕变的剧情尤为精彩，对青少年的感触极大。看过许多青春治愈系动漫，印象中从未有过一部动漫能在此方面与clannad比肩，哪怕是我十分喜爱的另一部动漫《樱花庄的宠物女孩》也不如cl。</p>
      <img src="../../../../assets/images/gallery/b.jpg" title="棒球比赛">
      <p>第一季，key社并没有很单刀直入的切入“生活”这个主题，而是先依照以往的风格，为每一位主人公都设置了一个温馨感人的故事。个人最喜欢的还是风子的剧情。伊吹风子是一个傲娇可爱又固执到让人心疼的小姑娘。因为车祸，风子长期住院，但key社给了他一个机会，让他以灵魂体的形式出现在男女主的身边，并为了姐姐的婚礼而努力。不过因为是灵魂体，人们都会渐渐忘记这个女孩，然后再也无法看见他。这里最感动我的是，男女主发现了疯子渐渐被人忘记，感到十分伤心，边跑去向疯子保证，绝对不会忘记疯子。<img src="../../../../assets/images/gallery/c.jpg" title="夕阳下二人">但第二天一睁眼，他们还是忘记了风子。当走到学校，然后突然想起一切时，才发现风子其实一直跟在他们身后，只不过市区级以后他们看不见风子而已。当看着活泼可爱的风子在那一瞬间沉默失落的时候，真的有很心痛。那种明明约定好，却无法遵守，只能让朋友失望的无力和愧疚感满满的一了出来，化作千万钢针扎着心脏，刺激着泪腺。Key社让男女主回复集以后，看着站在身边一言不发的风子这里的剧情十分完美。动漫中并没有具体的交代什么，但却留给了人们想象的空间：活泼的风子早上像往常一样开心地向男女主打招呼，却发现自己最好的朋友也忘记了自己，那种场景真是想想都替她委屈。</p>
      <p>在key社的另一部大作，little busters中也有类似的剧情（西园美鱼的故事，大家也都渐渐忘记了美鱼）尽管也很感人，但感觉依旧不如风子这段。这是用画风无法弥补的。</p>
      <p>第一季的几个故事都十分感人，但key社大多只是一直挖坑，并没有十分直观的引入主题，而是将悬念留到了第二季。</p>
      <img src="../../../../assets/images/gallery/d.jpg" title="人妻古河渚">
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
        let imgDom = this.$refs.article.getElementsByTagName('img'); // 获取所有img标签
        for (let i = 0; i < imgDom.length; i++) {
          let img = new window.Image(); // 获取原始图片的实例对象，以便获取原始图片的高宽
          img.src = imgDom[i].attributes.src.value;
          this.picList[i] = {};
          img.onload = () => {
            this.picList[i] = {
              src: img.src,
              w: img.width,
              h: img.height,
              title: imgDom[i].attributes.title ? imgDom[i].attributes.title.value : ''
            };
            this.bindClick(i);
          };
        }
      },
      // 为每一个img标签绑定单击事件
      bindClick(index) {
        let imgDom = this.$refs.article.getElementsByTagName('img');
        imgDom[index].onclick = () => {
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
  @import "article.sass";
</style>
