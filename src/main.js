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

// 2.2 引入自定义过渡效果
import './assets/styles/transform.css';

// 2.3 引入Lodash，并将其设置为全局变量
import _ from 'lodash';
window._ = _;

// 2.4 引入lscache存储离线数据
import lscache from 'lscache';
window.lscache = lscache;

// 2.5 引入moment时间处理库
const moment = require('moment');
moment.locale('zh-cn');

window.moment = moment;

// 2.6 引入echarts
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

// 2.7 设置jQuery 全局变量
import $ from 'jquery';
window.jQuery = window.$ = $;
// 2.8 全局声明
import constants from './../static/constants.js';
window.constants = constants;
// 2.9 公共方法
import utilsOper from './assets/scripts/common/utilsOper.js'
window.utilsOper = utilsOper;
// 2.10 提示框
import popupOper from './assets/scripts/common/popupOper.js'
window.popupOper = popupOper;

// 3.2 引入非父子组件间交互组件EventBus
import Bus from './assets/scripts/common/EventBus.js'
Vue.prototype.$bus = Bus

// 3.1 引入根组件
import App from './App'

// 引入vue-router路由框架
import router from './router'
/* eslint-disable no-new */
window.rootVm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
