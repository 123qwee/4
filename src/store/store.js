import Vue from 'vue';
import Vuex from 'vuex';

import commonInfo from './modules/commonInfo'; // 系统信息
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        commonInfo
    },
    strict: true
});