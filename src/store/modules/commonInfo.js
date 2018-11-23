import utilsOper from '@/assets/scripts/common/utilsOper';


const state = {
    userId:"",
};

const actions = {
};

const getters = {
    gUserId(state){
        return state.userId;
    }
};

// // 同步方法
const mutations = {
    mUserId(state,payload){
        let userId = utilsOper.GetQueryString("userId");
        state.userId = userId ? userId : "1";
    }
};


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
