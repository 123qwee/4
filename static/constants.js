// 生产环境还是开发环境 production development
const ENV = 'development';



// 后台服务地址
const HOST = ENV == 'development' ? 'http://117.34.95.9' : 'http://117.34.95.9';
const SERVER_PORT = ENV == 'development' ? '58071' : '8003';


// 默认服务地址前缀
const DEFAULT_URL = HOST + ":" + SERVER_PORT;


export default {
  SERVER_URL: DEFAULT_URL,

}
