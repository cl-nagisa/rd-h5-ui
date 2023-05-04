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
      this.$router.push({name: 'demo'});
    },
    toPosition(dom) {
      let position = this.$el.querySelector('.' + dom);
      this.apiList.scrollToElement(position);
      this.isMenuShow = false;
    }
  }
};
