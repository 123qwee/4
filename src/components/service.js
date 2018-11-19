import ajaxOper from '@/assets/scripts/ajax/ajaxOper.js';

const service = {
    // 统计
    statis(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: params.url,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
}
export default service
