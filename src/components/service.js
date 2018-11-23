import ajaxOper from '@/assets/scripts/ajax/ajaxOper.js';
import popupOper from '@/assets/scripts/common/popupOper.js'
const service = {
  // 用户信息
  getInfo(params) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: params.url,
      data: params.data,
      successFunc: (data) => {
        params.successFunc && params.successFunc(data);
      },
      errorFunc:()=>{
        popupOper.showErrorNoti({message:"请求失败"});
        popupOper.closeLoading();
      }
    })
  },
  // 统计
  statis(params) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: params.url,
      data: params.data,
      successFunc: (data) => {
        params.successFunc && params.successFunc(data);
      },
      errorFunc:()=>{
        popupOper.showErrorNoti({message:"请求失败"});
        popupOper.closeLoading();
      }
    })
  },
}
export default service
