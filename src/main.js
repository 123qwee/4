/**
 * @desc 该文件为项目入口文件
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 1.1 引入Vue、Vue-Router框架
import Vue from 'vue'

// 1.2 引入ElementUI界面库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import 'element-ui/lib/theme-default/index.css' // 默认主题

Vue.use(ElementUI)

// 1.3 引入babel和promise的polyfill使系统兼容IE浏览器11
import 'babel-polyfill';

require("es6-promise").polyfill();

// 2.1 样式文件使不同的浏览器在渲染网页元素的时候形式更统一
import 'normalize.css'
import './assets/styles/animate.css';

// 2.4 引入Lodash，并将其设置为全局变量
import _ from 'lodash';
window._ = _;

// 2.5 引入lscache存储离线数据
import lscache from 'lscache';
window.lscache = lscache;

// 2.6 引入moment时间处理库
const moment = require('moment');
moment.locale('zh-cn');

window.moment = moment;

// 2.7 引入echarts
import eCharts from 'echarts/lib/echarts.js';
Vue.prototype.$echarts = eCharts;

// 引入echarts组件
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

// 2.9 设置jQuery 全局变量
import $ from 'jquery';
window.jQuery = window.$ = $;

// 3.1 引入根组件
import App from './App'

// 引入vue-router路由框架
import router from './router'
/* eslint-disable no-new */
window.rootVm = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
