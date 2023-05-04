// modules依赖
import Vue from 'vue';
import axios from 'axios'; // http请求，类似于jQuery中的$ajax
import 'babel-polyfill'; // 解决安卓4.4以下axios不起作用的兼容性

// 本地依赖
import App from './App.vue'; // 初始化入口页面
import router from './router/index.js'; // 路由管理

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');

// Vue配置
Vue.config.productionTip = false; // 关闭生产模式下Vue调试信息
Vue.prototype.$http = axios; // 设置axios的数据请求方式

// axios配置
// axios.defaults.withCredentials = true; // 开启接收header中的cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 设置标准编码格式

if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function() {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      window.setTimeout(function() {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  });
}
