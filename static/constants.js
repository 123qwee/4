// 生产环境还是开发环境 production development
const ENV = 'development';



// 后台服务地址
// const HOST = ENV == 'development' ? '' : '';
// const SERVER_PORT = ENV == 'development' ? '' : '';


// 默认服务地址前缀
const DEFAULT_URL = "http://yshs.njylxxkj.com/scorpion/";


export default {
  ENV,
  SERVER_URL: DEFAULT_URL,
  // 本地缓存过期时间，默认30分钟
  SESSION_LIMIT: 30,

}
