import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => { require(['../views/index.vue'], resolve); },
      meta: { title: '综合产品ui库-封磊' }
    },
    {
      path: '/navbar/index',
      name: 'navbar',
      component: resolve => { require(['../views/navbar/index/index.vue'], resolve); },
      meta: { title: 'Navbar导航条' }
    },
    {
      path: '/navbar/demo',
      name: 'navbarDemo',
      component: resolve => { require(['../views/navbar/demo/demo.vue'], resolve); },
      meta: { title: 'Navbar导航条-demo' }
    },
    {
      path: '/navbar/api',
      name: 'navbrApi',
      component: resolve => { require(['../views/navbar/api/api.vue'], resolve); },
      meta: { title: 'Navbar导航条-api' }
    },
    {
      path: '/navbar/version',
      name: 'navbarVersion',
      component: resolve => { require(['../views/navbar/version/version.vue'], resolve); },
      meta: { title: 'Navbar导航条-version' }
    },
    {
      path: '/hCell/index',
      name: 'hCell',
      component: resolve => { require(['../views/hCell/index/index.vue'], resolve); },
      meta: { title: '水平单元格' }
    },
    {
      path: '/hCell/demo',
      name: 'hCellDemo',
      component: resolve => { require(['../views/hCell/demo/demo.vue'], resolve); },
      meta: { title: '水平单元格-demo' }
    },
    {
      path: '/hCell/api',
      name: 'hCellApi',
      component: resolve => { require(['../views/hCell/api/api.vue'], resolve); },
      meta: { title: '水平单元格-api' }
    },
    {
      path: '/hCell/version',
      name: 'hCellVersion',
      component: resolve => { require(['../views/hCell/version/version.vue'], resolve); },
      meta: { title: '水平单元格-version' }
    },
    {
      path: '/dataListUI/demo',
      name: 'dataListUI',
      component: resolve => { require(['../views/dataListUI/demo/demo.vue'], resolve); },
      meta: { title: '常用数据列表' }
    },
    {
      path: '/inputField/demo',
      name: 'inputField',
      component: resolve => { require(['../views/inputField/demo/demo.vue'], resolve); },
      meta: { title: '常用表单控件' }
    },
    {
      path: '/photoSwipe/index',
      name: 'photoSwipe',
      component: resolve => { require(['../views/photoSwipe/index/index.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器' }
    },
    {
      path: '/photoSwipe/demo',
      name: 'photoSwipeDemo',
      component: resolve => { require(['../views/photoSwipe/demo/demo.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器-demo' }
    },
    {
      path: '/photoSwipe/demo/gallery',
      name: 'gallery',
      component: resolve => { require(['../views/photoSwipe/demo/gallery/gallery.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器-demo-gallery' }
    },
    {
      path: '/photoSwipe/demo/article',
      name: 'article',
      component: resolve => { require(['../views/photoSwipe/demo/article/article.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器-demo-article' }
    },
    {
      path: '/photoSwipe/api',
      name: 'photoSwipeApi',
      component: resolve => { require(['../views/photoSwipe/api/api.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器-api' }
    },
    {
      path: '/photoSwipe/version',
      name: 'photoSwipeVersion',
      component: resolve => { require(['../views/photoSwipe/version/version.vue'], resolve); },
      meta: { title: 'PhotoSwipe图片查看器-version' }
    },
    {
      path: '/infoScrollBar/index',
      name: 'infoScrollBar',
      component: resolve => { require(['../views/infoScrollBar/index/index.vue'], resolve); },
      meta: { title: '信息轮播条' }
    },
    {
      path: '/infoScrollBar/demo',
      name: 'infoScrollBarDemo',
      component: resolve => { require(['../views/infoScrollBar/demo/demo.vue'], resolve); },
      meta: { title: '信息轮播条-demo' }
    },
    {
      path: '/infoScrollBar/api',
      name: 'infoScrollBarApi',
      component: resolve => { require(['../views/infoScrollBar/api/api.vue'], resolve); },
      meta: { title: '信息轮播条-api' }
    },
    {
      path: '/infoScrollBar/version',
      name: 'infoScrollBarVersion',
      component: resolve => { require(['../views/infoScrollBar/version/version.vue'], resolve); },
      meta: { title: '信息轮播条-version' }
    },
    {
      path: '/indexList/index',
      name: 'indexList',
      component: resolve => { require(['../views/indexList/index/index.vue'], resolve); },
      meta: { title: '索引列表' }
    },
    {
      path: '/indexList/demo',
      name: 'indexListDemo',
      component: resolve => { require(['../views/indexList/demo/demo.vue'], resolve); },
      meta: { title: '索引列表-demo' }
    },
    {
      path: '/indexList/api',
      name: 'indexListApi',
      component: resolve => { require(['../views/indexList/api/api.vue'], resolve); },
      meta: { title: '索引列表-api' }
    },
    {
      path: '/indexList/version',
      name: 'indexListVersion',
      component: resolve => { require(['../views/indexList/version/version.vue'], resolve); },
      meta: { title: '索引列表-version' }
    },
    {
      path: '/picker/index',
      name: 'picker',
      component: resolve => { require(['../views/picker/index/index.vue'], resolve); },
      meta: { title: '下拉选择器' }
    },
    {
      path: '/picker/demo',
      name: 'pickerDemo',
      component: resolve => { require(['../views/picker/demo/demo.vue'], resolve); },
      meta: { title: '下拉选择器-demo' }
    },
    {
      path: '/picker/api',
      name: 'pickerApi',
      component: resolve => { require(['../views/picker/api/api.vue'], resolve); },
      meta: { title: '下拉选择器-api' }
    },
    {
      path: '/picker/version',
      name: 'pickerVersion',
      component: resolve => { require(['../views/picker/version/version.vue'], resolve); },
      meta: { title: '下拉选择器-version' }
    },
    {
      path: '/circularProgress/index',
      name: 'circularProgress',
      component: resolve => { require(['../views/circularProgress/index/index.vue'], resolve); },
      meta: { title: '圆形进度圈' }
    },
    {
      path: '/circularProgress/demo',
      name: 'circularProgressDemo',
      component: resolve => { require(['../views/circularProgress/demo/demo.vue'], resolve); },
      meta: { title: '圆形进度圈-demo' }
    },
    {
      path: '/circularProgress/api',
      name: 'circularProgressApi',
      component: resolve => { require(['../views/circularProgress/api/api.vue'], resolve); },
      meta: { title: '圆形进度圈-api' }
    },
    {
      path: '/circularProgress/version',
      name: 'circularProgressVersion',
      component: resolve => { require(['../views/circularProgress/version/version.vue'], resolve); },
      meta: { title: '圆形进度圈-version' }
    },
    {
      path: '/progressBar/index',
      name: 'progressBar',
      component: resolve => { require(['../views/progressBar/index/index.vue'], resolve); },
      meta: { title: '水平进度条' }
    },
    {
      path: '/progressBar/demo',
      name: 'progressBarDemo',
      component: resolve => { require(['../views/progressBar/demo/demo.vue'], resolve); },
      meta: { title: '水平进度条-demo' }
    },
    {
      path: '/progressBar/api',
      name: 'progressBarApi',
      component: resolve => { require(['../views/progressBar/api/api.vue'], resolve); },
      meta: { title: '水平进度条-api' }
    },
    {
      path: '/progressBar/version',
      name: 'progressBarVersion',
      component: resolve => { require(['../views/progressBar/version/version.vue'], resolve); },
      meta: { title: '水平进度条-version' }
    },
    {
      path: '/scrollingCanvas/index',
      name: 'scrollingCanvas',
      component: resolve => { require(['../views/scrollingCanvas/index/index.vue'], resolve); },
      meta: { title: '滚动画布' }
    },
    {
      path: '/scrollingCanvas/demo',
      name: 'scrollingCanvasDemo',
      component: resolve => { require(['../views/scrollingCanvas/demo/demo.vue'], resolve); },
      meta: { title: '滚动画布-demo' }
    },
    {
      path: '/scrollingCanvas/api',
      name: 'scrollingCanvasApi',
      component: resolve => { require(['../views/scrollingCanvas/api/api.vue'], resolve); },
      meta: { title: '滚动画布-api' }
    },
    {
      path: '/scrollingCanvas/version',
      name: 'scrollingCanvasVersion',
      component: resolve => { require(['../views/scrollingCanvas/version/version.vue'], resolve); },
      meta: { title: '滚动画布-version' }
    },
    {
      path: '/flow/demo',
      name: 'flow',
      component: resolve => { require(['../views/flow/demo/demo.vue'], resolve); },
      meta: { title: '事件流程图-demo' }
    },
    {
      path: '/upLoad/index',
      name: 'upLoad',
      component: resolve => { require(['../views/upLoad/index/index.vue'], resolve); },
      meta: { title: '图片上传预览' }
    },
    {
      path: '/upLoad/demo',
      name: 'upLoadDemo',
      component: resolve => { require(['../views/upLoad/demo/demo.vue'], resolve); },
      meta: { title: '图片上传预览-demo' }
    },
    {
      path: '/upLoad/api',
      name: 'upLoadApi',
      component: resolve => { require(['../views/upLoad/api/api.vue'], resolve); },
      meta: { title: '图片上传预览-api' }
    },
    {
      path: '/upLoad/version',
      name: 'upLoadVersion',
      component: resolve => { require(['../views/upLoad/version/version.vue'], resolve); },
      meta: { title: '图片上传预览-version' }
    },
    {
      path: '/calendar/index',
      name: 'calendar',
      component: resolve => { require(['../views/calendar/index/index.vue'], resolve); },
      meta: { title: '日历' }
    },
    {
      path: '/calendar/demo',
      name: 'calendarDemo',
      component: resolve => { require(['../views/calendar/demo/demo.vue'], resolve); },
      meta: { title: '日历-demo' }
    },
    {
      path: '/calendar/api',
      name: 'calendarApi',
      component: resolve => { require(['../views/calendar/api/api.vue'], resolve); },
      meta: { title: '日历-api' }
    },
    {
      path: '/calendar/version',
      name: 'calendarVersion',
      component: resolve => { require(['../views/calendar/version/version.vue'], resolve); },
      meta: { title: '日历-version' }
    },
    {
      path: '/simpleCalendar/index',
      name: 'simpleCalendar',
      component: resolve => { require(['../views/simpleCalendar/index/index.vue'], resolve); },
      meta: { title: '简单日历' }
    },
    {
      path: '/simpleCalendar/demo',
      name: 'simpleCalendarDemo',
      component: resolve => { require(['../views/simpleCalendar/demo/demo.vue'], resolve); },
      meta: { title: '简单日历-demo' }
    },
    {
      path: '/simpleCalendar/api',
      name: 'simpleCalendarApi',
      component: resolve => { require(['../views/simpleCalendar/api/api.vue'], resolve); },
      meta: { title: '简单日历-api' }
    },
    {
      path: '/simpleCalendar/version',
      name: 'simpleCalendarVersion',
      component: resolve => { require(['../views/simpleCalendar/version/version.vue'], resolve); },
      meta: { title: '简单日历-version' }
    },
    {
      path: '/videoPlayer/index',
      name: 'videoPlayer',
      component: resolve => { require(['../views/videoPlayer/index/index.vue'], resolve); },
      meta: { title: '视频播放器' }
    },
    {
      path: '/videoPlayer/demo',
      name: 'videoPlayerDemo',
      component: resolve => { require(['../views/videoPlayer/demo/demo.vue'], resolve); },
      meta: { title: '视频播放器-demo' }
    },
    {
      path: '/videoPlayer/api',
      name: 'videoPlayerApi',
      component: resolve => { require(['../views/videoPlayer/api/api.vue'], resolve); },
      meta: { title: '视频播放器-api' }
    },
    {
      path: '/videoPlayer/version',
      name: 'videoPlayerVersion',
      component: resolve => { require(['../views/videoPlayer/version/version.vue'], resolve); },
      meta: { title: '视频播放器-version' }
    }
  ]
});
