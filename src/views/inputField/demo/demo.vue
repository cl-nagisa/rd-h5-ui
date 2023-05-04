<!-- by fl -->
<template>
  <div class="page better-scroll" ref="scroll">
    <div class="scroll-wrapper">
      <div class="demo label-version">
        <input-field class="input" label="用户名" placeholder="请输入用户名" :attr="{ 'maxlength': 12 }"></input-field>
        <input-field class="input" label="密码" type="password" placeholder="请输入密码" switchEye></input-field>
        <input-field class="input" v-model="phone" label="手机号码" type="tel" placeholder="请输入手机号码" regularName="setPhone" :readonly="phoneClock"></input-field>
        <input-field class="input" label="图形验证码" type="text" placeholder="请输入图形验证码" :disableClear="false">
          <img class="code-img" src="../../../assets/images/icon/code.png">
        </input-field>
        <input-field class="input" label="短信验证码" type="tel" placeholder="请输入短信验证码" regularName="setNumber" :disableClear="false">
          <div class="get-code" :class="{ 'disabled': disabled || (time > 0 && time < waitTime) }" @click="countDown">{{ time > 0 && time < waitTime ? time + '秒后重试' : '获取验证码' }}</div>
        </input-field>
      </div>
      <div class="demo">
        <input-field class="input" label="充值金额" type="text" placeholder="请输入充值金额" regularName="setMoney" :disableClear="false">
          <div class="unit">元</div>
        </input-field>
      </div>
      <div class="demo icon-version">
        <input-field class="input" :img="require('../../../assets/images/icon/input_userName.png')" placeholder="请输入用户名" :attr="{ 'maxlength': 12 }"></input-field>
        <input-field class="input" :img="require('../../../assets/images/icon/input_password.png')" type="password" placeholder="请输入密码" switchEye></input-field>
        <input-field class="input" :img="require('../../../assets/images/icon/input_phone.png')" type="tel" placeholder="请输入手机号码" regularName="setPhone"></input-field>
        <input-field class="input" :img="require('../../../assets/images/icon/input_code.png')" type="text" placeholder="请输入图形验证码" :disableClear="false">
          <img class="code-img" src="../../../assets/images/icon/code.png">
        </input-field>
        <input-field class="input" :img="require('../../../assets/images/icon/input_code.png')" type="tel" placeholder="请输入短信验证码" regularName="setNumber" :disableClear="false">
          <div class="get-code disabled">获取验证码</div>
        </input-field>
      </div>
      <div class="demo singleLine-version">
        <input-field class="input" v-model="userName" type="tel" placeholder="请输入手机号码" regularName="setPhone" align="center" @onActive="onActive"></input-field>
        <input-field class="input" v-model="userPwd" type="password" placeholder="请输入密码" align="center" switchEye :switchEyeDefaultShow="false" @onActive="onActive"></input-field>
      </div>

      <div class="demo">
        <rd-button :disable="btnDisable" :loading="loading" @click="submit"></rd-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import InputField from '../../../components/InputField/InputField.vue';
  import RdButton from '../../../components/Button/Button.vue';

  export default {
    data() {
      return {
        userName: '',
        userPwd: '',
        scroll: '',
        phone: '', // 手机号码
        timer: '', // 计时器
        waitTime: 10, // 短信倒计时秒数
        time: 10,
        phoneClock: false, // 手机号输入框是否禁止输入，true禁止输入
        test: false,
        loading: false
      };
    },
    components: { InputField, RdButton },
    computed: {
      disabled() {
        if (this.phone !== '') {
          return false;
        } else {
          return true;
        }
      },
      btnDisable() {
        if (this.userName && this.userPwd) {
          return false;
        } else {
          return true;
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this._initWheel(this.$refs.scroll);
      });
    },
    methods: {
      _initWheel(dom) {
        this.scroll = new BScroll(dom, {
          bounce: false,
          click: true,
          probeType: 2
        });
      },
      // 获取验证码倒计时
      countDown() {
        if (this.phoneClock) {
          return false;
        }
        if (this.disabled) {
          window.alert('请先输入手机号码');
          return false;
        }
        if (/^1[3456789]\d{9}$/.test(this.phone) === false) {
          window.alert('请输入正确的手机号码');
          return false;
        }
        this.time = this.waitTime;
        this.phoneClock = true;
        this.timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            clearInterval(this.timer);
            this.phoneClock = false;
          }
        }, 1000);
      },
      // 输入框高亮效果
      onActive(that, val) {
        if (val) {
          that.$el.classList.add('active');
        } else {
          that.$el.classList.remove('active');
        }
      },
      submit() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
  @import "demo.sass";
</style>
